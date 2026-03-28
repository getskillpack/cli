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
    throw new Error(`Registry ${res.status} ${res.statusText}: ${text || url}`);
  }
  return (await res.json()) as T;
}
