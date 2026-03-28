import type { Buffer } from "node:buffer";

const DEFAULT_BASE = "https://registry.skpkg.org/api/v1";

function trimBase(raw: string | undefined): string | null {
  const t = raw?.trim();
  return t && t.length > 0 ? t.replace(/\/$/, "") : null;
}

/** Registry API base URL. `SKILLGET_REGISTRY_URL` wins; `SKPKG_REGISTRY_URL` is legacy fallback. */
export function registryBaseUrl(): string {
  return trimBase(process.env.SKILLGET_REGISTRY_URL) ?? trimBase(process.env.SKPKG_REGISTRY_URL) ?? DEFAULT_BASE;
}

/** Which env var (if any) selected the registry URL — for `skillget config` output. */
export function registryConfigSource(): "SKILLGET_REGISTRY_URL" | "SKPKG_REGISTRY_URL" | "default" {
  if (trimBase(process.env.SKILLGET_REGISTRY_URL)) return "SKILLGET_REGISTRY_URL";
  if (trimBase(process.env.SKPKG_REGISTRY_URL)) return "SKPKG_REGISTRY_URL";
  return "default";
}

function trimToken(raw: string | undefined): string {
  const t = raw?.trim();
  return t && t.length > 0 ? t : "";
}

/** Bearer token for POST /skills (publish). SKILLGET_REGISTRY_TOKEN wins; SKILLGET_TOKEN is alias. */
export function registryToken(): string {
  return trimToken(process.env.SKILLGET_REGISTRY_TOKEN) || trimToken(process.env.SKILLGET_TOKEN);
}

function hintForStatus(status: number): string {
  switch (status) {
    case 401:
      return "\nHint: set SKILLGET_REGISTRY_TOKEN (or SKILLGET_TOKEN) for authenticated requests.";
    case 404:
      return "\nHint: check the skill name and SKILLGET_REGISTRY_URL.";
    case 410:
      return "\nHint: this version was yanked and cannot be installed.";
    case 409:
      return "\nHint: this skill version already exists; bump version or yank the old release.";
    case 503:
      return "\nHint: registry write API may be disabled on the server (REGISTRY_WRITE_TOKEN).";
    default:
      return "";
  }
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${registryBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Registry ${res.status} ${res.statusText}: ${text || url}${hintForStatus(res.status)}`);
  }
  return (await res.json()) as T;
}

/** Multipart POST /skills (manifest JSON field + archive file). */
export async function publishSkill(manifestJson: string, archive: Buffer): Promise<void> {
  const token = registryToken();
  if (!token) {
    throw new Error("publish requires SKILLGET_REGISTRY_TOKEN (or SKILLGET_TOKEN)");
  }
  const url = `${registryBaseUrl()}/skills`;
  const form = new FormData();
  form.set("manifest", manifestJson);
  form.set("archive", new Blob([archive as BlobPart], { type: "application/gzip" }), "skill.tar.gz");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: form,
  });
  if (res.status === 201) {
    return;
  }
  const text = await res.text().catch(() => "");
  throw new Error(`publish failed: Registry ${res.status} ${res.statusText}: ${text || url}${hintForStatus(res.status)}`);
}
