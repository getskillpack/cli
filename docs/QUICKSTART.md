# skillget CLI — Quick start (English)

This guide is the **user-facing entry point** for the command-line client of the [getskillpack](https://github.com/getskillpack) skill registry.

**New here?** Follow the guided path first: [Zero to first skill](ZERO_TO_FIRST_SKILL.md) (install → search → install → verify, with troubleshooting).

## npm install (~60 seconds)

Requires **Node.js 18+**.

```bash
npm install -g @getskillpack/cli
skillget config
skillget list -limit 10
skillget install para-memory-files
```

Default registry: `https://registry.skpkg.org/api/v1`. Narrative and positioning: [getskillpack.github.io/landing](https://getskillpack.github.io/landing/). If the install step 404s, run `skillget list` and pick a name from the output ([example catalog](EXAMPLE_SKILL_CATALOG.md)).

## What you need

- **Go 1.22+** if you build the native binary from this repository.
- Network access to the registry HTTP API (default: production base URL below).

## API contract (source of truth)

Registry HTTP contracts and stability notes live in the **`getskillpack/registry`** repository:

- [API.md](https://github.com/getskillpack/registry/blob/main/API.md)

The Go CLI delegates protocol details to [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager). Env vars, routes, and expected HTTP status codes for the compiled client are documented in **[REGISTRY_CLIENT_CONTRACT.md](https://github.com/getskillpack/skillget-manager/blob/main/docs/REGISTRY_CLIENT_CONTRACT.md)**; the CLI does not fork that behavior. Keep CLI releases aligned with registry and manager semver / changelog when behavior changes.

## Build the native CLI

From the repository root:

```bash
go build -o skillget ./cmd/skillget
./skillget --help
./skillget -V
```

**Tests:** `go test -mod=vendor -short ./...` is what CI runs (no live registry). Full smoke against production: `go test -mod=vendor ./cmd/skillget/ -run 'TestPublicRegistry.*Integration'` (optional `SKILLGET_SMOKE_INSTALL_SPEC` to override the default install skill name). In GitHub: workflow **Registry smoke (live)** (manual or weekly). Offline: prefix with `SKIP_SKILLGET_REGISTRY_INTEGRATION=1` (same variable as `npm run test:integration`).

**Private GitHub modules:** while `skillget-manager` is fetched from the private org, set `GOPRIVATE` / `GONOSUMDB` and git credentials for `github.com` (HTTPS or SSH). Maintainer-oriented checklist: [BOARD_PAT_QUICK_RU.md](BOARD_PAT_QUICK_RU.md) (§4 and local build notes). GitHub Actions needs repository secret `GETSKILLPACK_ORG_PAT` — same doc, §1.

## Point at a registry

By default the CLI uses:

`https://registry.skpkg.org/api/v1`

To use another base URL (for example a local dev server):

```bash
export SKILLGET_REGISTRY_URL=http://localhost:3000/api/v1
```

`SKPKG_REGISTRY_URL` is still accepted as a **legacy** fallback.

If the registry operator requires a bearer token for **read** access (`REGISTRY_READ_TOKEN` on the server), set `SKILLGET_REGISTRY_READ_TOKEN`. When it is unset but a write token is set (`SKILLGET_REGISTRY_TOKEN` or `SKILLGET_TOKEN`), the same bearer is used for GETs and archive downloads — see the contract linked above.

## Common commands

Subcommand flags: `skillget search -h`, `skillget install -h`, `skillget publish -h` (or `--help`).

Print effective registry URL and how it was resolved:

```bash
skillget config
```

Search skills (optional query string):

```bash
skillget search
skillget search my-query
```

Install a skill by name or pin a version with `name@version`:

```bash
skillget install alpha-test-skill
skillget install alpha-test-skill@1.2.3
```

See also [Example skill catalog](EXAMPLE_SKILL_CATALOG.md) (registry discovery and example packs in `examples/`).

After `install`, the working directory gets:

- **`skills.lock`** — pinned versions.
- **`.skillget/skills/<name>/<version>/`** — downloaded archive (unless you pass `-o`).

Extract the archive where you need it, for example:

```bash
tar -xzf .skillget/skills/<name>/<version>/<file>.tar.gz
```

## npm prototype (optional)

The repository still ships a Node-based prototype:

```bash
npm install
npm run build
node dist/cli.js --help
```

The **supported** path for end users is the **Go binary**; npm publishing is optional and coordinated separately.

## Releases and versioning

See [RELEASE.md](RELEASE.md) and the root [CHANGELOG.md](../CHANGELOG.md).
