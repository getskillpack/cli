# skillget CLI — Quick start (English)

This guide is the **user-facing entry point** for the command-line client of the [getskillpack](https://github.com/getskillpack) skill registry.

## What you need

- **Go 1.22+** if you build the native binary from this repository.
- Network access to the registry HTTP API (default: production base URL below).

## API contract (source of truth)

Registry HTTP contracts and stability notes live in the **`getskillpack/registry`** repository:

- [API.md](https://github.com/getskillpack/registry/blob/main/API.md)

The Go CLI delegates protocol details to [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager). Keep CLI releases aligned with registry and manager semver / changelog when behavior changes.

## Build the native CLI

From the repository root:

```bash
go build -o skillget ./cmd/skillget
./skillget --help
./skillget -V
```

## Point at a registry

By default the CLI uses:

`https://registry.skpkg.org/api/v1`

To use another base URL (for example a local dev server):

```bash
export SKILLGET_REGISTRY_URL=http://localhost:3000/api/v1
```

`SKPKG_REGISTRY_URL` is still accepted as a **legacy** fallback.

## Common commands

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
