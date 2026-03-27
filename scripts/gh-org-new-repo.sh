#!/usr/bin/env bash
set -euo pipefail

# Create a repository under org getskillpack using GETSKILLPACK_ORG_PAT (env only).
# Usage: ./scripts/gh-org-new-repo.sh <repo-name> [private|public]
# Optional: GETSKILLPACK_REPO_DESCRIPTION="..." for GitHub description field.

ORG="getskillpack"

if [[ -z "${GETSKILLPACK_ORG_PAT:-}" ]]; then
  echo "GETSKILLPACK_ORG_PAT is not set." >&2
  exit 1
fi

name="${1:-}"
visibility="${2:-private}"

if [[ -z "$name" ]]; then
  echo "usage: $0 <repo-name> [private|public]" >&2
  exit 1
fi

case "$visibility" in
  private) private_json=true ;;
  public) private_json=false ;;
  *)
    echo "second arg must be 'private' or 'public', got: $visibility" >&2
    exit 1
    ;;
esac

desc="${GETSKILLPACK_REPO_DESCRIPTION:-}"

json=$(jq -n \
  --arg n "$name" \
  --argjson p "$private_json" \
  --arg d "$desc" \
  '{name: $n, private: $p} + (if ($d | length) > 0 then {description: $d} else {} end)')

resp=$(curl -sS -w "\n%{http_code}" \
  -X POST \
  -H "Authorization: Bearer ${GETSKILLPACK_ORG_PAT}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d "$json" \
  "https://api.github.com/orgs/${ORG}/repos")

code=$(echo "$resp" | tail -n1)
body=$(echo "$resp" | sed '$d')

if [[ "$code" != "201" ]]; then
  echo "GitHub API error HTTP $code" >&2
  echo "$body" >&2
  exit 1
fi

html_url=$(echo "$body" | jq -r '.html_url // empty')
clone_url=$(echo "$body" | jq -r '.clone_url // empty')

echo "Created: ${html_url}"
echo "Clone (HTTPS): ${clone_url}"
echo "Suggested SSH remote: git@github.com:${ORG}/${name}.git"
