#!/usr/bin/env node
import { Command } from "commander";
import { createWriteStream, readFileSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import {
  fetchJson,
  publishSkill,
  registryBaseUrl,
  registryConfigSource,
  registryToken,
} from "./registry.js";

const LOCKFILE_NAME = "skills.lock";

type SkillsLockfile = {
  lockfileVersion: 1;
  skills: Record<string, string>;
};

function readSkillsLock(cwd: string): SkillsLockfile {
  const p = join(cwd, LOCKFILE_NAME);
  try {
    const raw = readFileSync(p, "utf8");
    const j = JSON.parse(raw) as Partial<SkillsLockfile>;
    if (j?.lockfileVersion === 1 && j.skills && typeof j.skills === "object" && !Array.isArray(j.skills)) {
      return { lockfileVersion: 1, skills: { ...j.skills } };
    }
  } catch {
    /* missing or invalid */
  }
  return { lockfileVersion: 1, skills: {} };
}

function writeSkillsLock(cwd: string, lock: SkillsLockfile): void {
  const p = join(cwd, LOCKFILE_NAME);
  writeFileSync(p, `${JSON.stringify(lock, null, 2)}\n`, "utf8");
}

const pkgPath = join(dirname(fileURLToPath(import.meta.url)), "..", "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as {
  version: string;
  description: string;
};

type ListResponse = {
  data: Array<{
    name: string;
    description?: string;
    author?: string;
    latest_version?: string;
  }>;
  meta?: { total?: number };
};

type VersionDetail = {
  name: string;
  version: string;
  archive_url: string;
  checksum?: string;
};

type SkillDetail = {
  name: string;
  repository_url?: string | null;
  homepage?: string | null;
  dependencies?: Array<{ name: string; range?: string }>;
  latest_version?: string | null;
  versions?: Array<{ version: string; is_yanked?: boolean }>;
};

function parseNameVersion(spec: string): { name: string; version?: string } {
  const at = spec.lastIndexOf("@");
  if (at <= 0) return { name: spec };
  return { name: spec.slice(0, at), version: spec.slice(at + 1) };
}

async function runListOrSearch(query: string | undefined, opts: { limit: string; author?: string }) {
  const limit = Number(opts.limit) || 20;
  const params = new URLSearchParams({ limit: String(limit), offset: "0" });
  if (query) params.set("q", query);
  if (opts.author) params.set("author", opts.author);
  const path = `/skills?${params.toString()}`;
  const body = await fetchJson<ListResponse>(path);
  if (!body.data?.length) {
    console.log("No skills found.");
    return;
  }
  for (const row of body.data) {
    const ver = row.latest_version ? `@${row.latest_version}` : "";
    console.log(`${row.name}${ver}`);
    if (row.description) console.log(`  ${row.description}`);
  }
  const total = body.meta?.total;
  if (typeof total === "number") console.log(`\n(${total} total)`);
}

const program = new Command();

program
  .name("skillget")
  .description(pkg.description)
  .version(pkg.version, "-V, --version", "print version");

program
  .command("list")
  .argument("[query]", "optional search string")
  .option("-l, --limit <n>", "max rows", "20")
  .option("-a, --author <who>", "filter by author")
  .description("list skills in the registry (same API as search)")
  .action(async (query: string | undefined, opts: { limit: string; author?: string }) => {
    await runListOrSearch(query, opts);
  });

program
  .command("search")
  .argument("[query]", "optional search string")
  .option("-l, --limit <n>", "max rows", "20")
  .option("-a, --author <who>", "filter by author")
  .description("search skills in the registry")
  .action(async (query: string | undefined, opts: { limit: string; author?: string }) => {
    await runListOrSearch(query, opts);
  });

program
  .command("install")
  .argument("<spec>", "skill name or name@version")
  .option(
    "-o, --output <path>",
    "directory to extract tarball (default: ./.skillget/skills/<name>/<version>)",
  )
  .description("download a skill archive from the registry")
  .action(async (spec: string, opts: { output?: string }) => {
    const { name, version: pinned } = parseNameVersion(spec);
    let version = pinned;
    if (!version) {
      const detail = await fetchJson<SkillDetail>(`/skills/${encodeURIComponent(name)}`);
      const active = detail.versions?.filter((v) => !v.is_yanked) ?? [];
      const latest = active[0]?.version;
      if (!latest) {
        throw new Error(`No installable versions for skill "${name}".`);
      }
      version = latest;
    }
    const meta = await fetchJson<VersionDetail>(
      `/skills/${encodeURIComponent(name)}/versions/${encodeURIComponent(version)}`,
    );
    const outDir =
      opts.output ?? join(process.cwd(), ".skillget", "skills", meta.name, meta.version);
    const fileName = `${meta.name}-${meta.version}.tar.gz`;
    const dest = join(outDir, fileName);
    await mkdir(dirname(dest), { recursive: true });

    const archiveRes = await fetch(meta.archive_url);
    if (!archiveRes.ok) {
      throw new Error(`Download failed ${archiveRes.status}: ${meta.archive_url}`);
    }
    if (!archiveRes.body) throw new Error("Empty response body");
    await pipeline(archiveRes.body, createWriteStream(dest));

    const cwd = process.cwd();
    const lock = readSkillsLock(cwd);
    lock.skills[meta.name] = meta.version;
    writeSkillsLock(cwd, lock);
    console.log(`Wrote ${dest}`);
    console.log(`Updated ${join(cwd, LOCKFILE_NAME)}`);
    if (meta.checksum) console.log(`Checksum (registry): ${meta.checksum}`);
    console.log("Extract the archive where you need it (tar -xzf …).");
  });

program
  .command("publish")
  .argument("<archive>", "path to .tar.gz archive")
  .option("--manifest <file>", "manifest JSON (name and version required)")
  .option("--name <n>", "skill name (use with --skill-version if no manifest file)")
  .option("--skill-version <v>", "semver for this publish")
  .option("--description <text>", "short description")
  .option("--author <who>", "author label")
  .description("publish a skill version (requires registry write token)")
  .action(
    async (
      archivePath: string,
      opts: {
        manifest?: string;
        name?: string;
        skillVersion?: string;
        description?: string;
        author?: string;
      },
    ) => {
      let manifestJson: string;
      if (opts.manifest) {
        if (opts.name || opts.skillVersion || opts.description || opts.author) {
          throw new Error("with --manifest, do not pass --name, --skill-version, --description, or --author");
        }
        manifestJson = readFileSync(opts.manifest, "utf8");
      } else {
        if (!opts.name || !opts.skillVersion) {
          throw new Error("either --manifest <file> or both --name and --skill-version are required");
        }
        const m: Record<string, string> = {
          name: opts.name,
          version: opts.skillVersion,
        };
        if (opts.description) m.description = opts.description;
        if (opts.author) m.author = opts.author;
        manifestJson = JSON.stringify(m);
      }
      const archive = readFileSync(archivePath);
      await publishSkill(manifestJson, archive);
      console.log("Published (201 Created).");
    },
  );

program
  .command("config")
  .description("show effective registry configuration")
  .action(() => {
    const url = registryBaseUrl();
    const src = registryConfigSource();
    console.log(`registry URL: ${url}`);
    console.log(`source: ${src}`);
    if (src === "default") {
      console.log("override: export SKILLGET_REGISTRY_URL=… (or legacy SKPKG_REGISTRY_URL)");
    }
    if (registryToken()) {
      console.log("write token: set (SKILLGET_REGISTRY_TOKEN or SKILLGET_TOKEN)");
    } else {
      console.log("write token: not set — required for skillget publish");
    }
  });

try {
  await program.parseAsync(process.argv);
} catch (e) {
  const msg = e instanceof Error ? e.message : String(e);
  console.error(`skillget: ${msg}`);
  process.exitCode = 1;
}
