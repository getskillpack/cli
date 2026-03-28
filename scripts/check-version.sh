#!/usr/bin/env bash
# Ensure VERSION, package.json, and Go CLI const stay in sync (CI + local).
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)
cd "$root"

v=$(tr -d '[:space:]' < VERSION)
pj=$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' package.json | head -1)
mg=$(grep -E '^const version = ' cmd/skillget/main.go | sed -E 's/^const version = "([^"]+)".*/\1/')

if [[ -z "$v" || -z "$pj" || -z "$mg" ]]; then
  echo "check-version: failed to parse version from VERSION, package.json, or cmd/skillget/main.go" >&2
  exit 1
fi

if [[ "$v" != "$pj" ]] || [[ "$v" != "$mg" ]]; then
  echo "check-version: mismatch — VERSION=$v package.json=$pj main.go=$mg" >&2
  exit 1
fi

echo "check-version: ok ($v)"
