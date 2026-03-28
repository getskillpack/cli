/**
 * Integration: public registry — GET /skills → GET /skills/:name/versions/:version → download + sha256.
 * Run: npm run test:integration (builds dist first).
 * Offline sandboxes: SKIP_SKILLGET_REGISTRY_INTEGRATION=1 skips the test (do not use in CI that should assert public registry).
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, rmSync } from "node:fs";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const cli = join(root, "dist", "cli.js");
const base =
  process.env.SKILLGET_REGISTRY_URL?.replace(/\/$/, "") ||
  "https://registry.skpkg.org/api/v1";
const skill = process.env.SKILLGET_INTEGRATION_SKILL || "para-memory-files";

async function main() {
  if (process.env.SKIP_SKILLGET_REGISTRY_INTEGRATION === "1") {
    console.log(
      "SKIP_SKILLGET_REGISTRY_INTEGRATION=1 — skipping public registry integration test.",
    );
    return;
  }
  const listUrl = `${base}/skills?q=${encodeURIComponent(skill)}&limit=20&offset=0`;
  const listRes = await fetch(listUrl, { headers: { Accept: "application/json" } });
  if (!listRes.ok) {
    throw new Error(`GET /skills failed ${listRes.status}: ${listUrl}`);
  }
  const list = await listRes.json();
  const row = list.data?.find((r) => r.name === skill);
  const version = row?.latest_version;
  if (!version) {
    throw new Error(`Skill ${skill} not found or no latest_version in list`);
  }

  const verUrl = `${base}/skills/${encodeURIComponent(skill)}/versions/${encodeURIComponent(version)}`;
  const verRes = await fetch(verUrl, { headers: { Accept: "application/json" } });
  if (!verRes.ok) {
    throw new Error(`GET version failed ${verRes.status}: ${verUrl}`);
  }
  const meta = await verRes.json();
  const m = /^sha256:([a-fA-F0-9]{64})$/.exec((meta.checksum || "").trim());
  if (!m) {
    throw new Error(`Expected sha256 checksum from registry, got: ${meta.checksum}`);
  }
  const expectedHex = m[1].toLowerCase();

  const work = mkdtempSync(join(tmpdir(), "skillget-int-"));
  const outDir = join(work, "out");
  try {
    // Unpinned spec → CLI resolves version via GET /skills, then GET /versions/:v
    const r = spawnSync(process.execPath, [cli, "install", skill, "-o", outDir], {
      cwd: work,
      encoding: "utf8",
      env: { ...process.env, SKILLGET_REGISTRY_URL: base },
    });
    if (r.status !== 0) {
      console.error(r.stdout, r.stderr);
      throw new Error(`cli exit ${r.status}`);
    }

    const archiveName = `${meta.name}-${meta.version}.tar.gz`;
    const archivePath = join(outDir, archiveName);
    const buf = readFileSync(archivePath);
    const got = createHash("sha256").update(buf).digest("hex");
    if (got !== expectedHex) {
      throw new Error(`SHA256 mismatch: expected ${expectedHex}, got ${got}`);
    }
    console.log("integration OK:", archivePath, "sha256", got);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
