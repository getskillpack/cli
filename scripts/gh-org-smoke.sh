#!/usr/bin/env bash
set -euo pipefail

# Smoke-check GitHub API access for org getskillpack using GETSKILLPACK_ORG_PAT from the environment.
# Do not pass the token on the command line or commit it.

if [[ -z "${GETSKILLPACK_ORG_PAT:-}" ]]; then
  echo "GETSKILLPACK_ORG_PAT is not set. Export it in your shell or use a secret manager." >&2
  exit 1
fi

TOKEN="$GETSKILLPACK_ORG_PAT"
ORG="getskillpack"

curl -sS -f -H "Authorization: Bearer ${TOKEN}" -H "Accept: application/vnd.github+json" \
  "https://api.github.com/user" >/dev/null
echo "ok: authenticated as GitHub user"

curl -sS -f -H "Authorization: Bearer ${TOKEN}" -H "Accept: application/vnd.github+json" \
  "https://api.github.com/orgs/${ORG}" >/dev/null
echo "ok: can read org ${ORG}"
