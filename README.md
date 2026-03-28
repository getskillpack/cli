# skillget CLI

Official CLI for the [getskillpack](https://github.com/getskillpack) skill registry: **`list`**, **`search`**, **`install`**, **`publish`**, **`config`**.

## At a glance

**Who it’s for**

- **Maintainers and skill authors** — versioned skills, trusted sources, optional self-hosted registry.
- **Platform / DevOps** — one predictable flow for skill artifacts next to your existing supply chain.
- **Teams already using npm, PyPI, or Packagist** — same *search → install → lockfile* muscle memory, applied to agent/IDE **skills**.

**Positioning** — *Skill manager and registry that fit the developer workflow you already have*: open, predictable installs and a clear HTTP contract — not a replacement for language package managers.

**Try it in one command** (Node 18+):

```bash
npm install -g @getskillpack/cli && skillget search
```

Build from Go source instead? See **Install** below (`go build` + `skillget config`) or [Quick start](docs/QUICKSTART.md).

**Docs (start here)**

- **[Zero → first skill](docs/ZERO_TO_FIRST_SKILL.md)** — end-to-end tutorial, copy-paste, common failures.
- **[Quick start](docs/QUICKSTART.md)** — env vars, `search` / `install` / `config`.
- **Registry contract:** [registry-api.md](https://github.com/getskillpack/registry/blob/main/docs/registry-api.md) · **[Publish a skill](docs/PUBLISH_YOUR_SKILL.md)**.

### vs familiar package registries (short)

| | npm · PyPI · Packagist | skillget / getskillpack |
|---|------------------------|-------------------------|
| Unit of install | Language package | **Skill** tarball + manifest |
| Discover + pin | registry + lockfile | **`skillget search` / `install` + `skills.lock`** |
| On-disk tree | `node_modules` / site-packages / `vendor` | **`.skillget/skills/<name>/<version>/`** |

Expanded positioning and growth framing (maintainers): [docs/MARKETING_LANDING_AND_GROWTH.md](docs/MARKETING_LANDING_AND_GROWTH.md) · [docs/README.md](docs/README.md) (full index). Hands-on discovery: [Example skill catalog](docs/EXAMPLE_SKILL_CATALOG.md).

**If this is useful:** starring [`getskillpack/cli`](https://github.com/getskillpack/cli), [`getskillpack/registry`](https://github.com/getskillpack/registry), and [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager) helps discovery — no bots or reciprocal schemes; see [docs/MARKETING_LANDING_AND_GROWTH.md](docs/MARKETING_LANDING_AND_GROWTH.md).

**Public landing:** [getskillpack.github.io/landing/](https://getskillpack.github.io/landing/) · source mirror in this repo: [docs/landing/](docs/landing/).

## User docs (English)

- **[Zero → first skill (tutorial)](docs/ZERO_TO_FIRST_SKILL.md)** — install through first `skillget install` and verification; copy-paste blocks; common failures.
- **[Quick start](docs/QUICKSTART.md)** — build, env vars, `search` / `install` / `config`.
- **[Example skill catalog](docs/EXAMPLE_SKILL_CATALOG.md)** — CLI discovery plus five example packs under `examples/`.
- **[Publish your own skill](docs/PUBLISH_YOUR_SKILL.md)** — tarball layout, manifest, and `skillget publish`.
- **[Release process](docs/RELEASE.md)** — semver, tags, changelog, alignment with the registry API.
- **[Changelog](CHANGELOG.md)** — version history ([Keep a Changelog](https://keepachangelog.com/en/1.1.0/)).
- **[Documentation index](docs/README.md)** — maintainer- and growth-oriented material (optional read).

## Landing

- **Public site (GitHub Pages):** [`getskillpack/landing`](https://github.com/getskillpack/landing) — canonical URL **https://getskillpack.github.io/landing/**. Pages are built from the `docs/` folder on `main`. Source mirror in this repo: [docs/landing/](docs/landing/). Optional workflow: [.github/workflows/deploy-landing.yml](.github/workflows/deploy-landing.yml).

## Install demo (visual)

Terminal session preview:

![skillget: search and install](docs/landing/terminal-demo.svg)

With [asciinema](https://asciinema.org/docs/installation) locally:

```bash
asciinema play docs/asciinema/skillget-quickstart.cast
```

Recording source: [`docs/asciinema/skillget-quickstart.cast`](docs/asciinema/skillget-quickstart.cast).

## Product repositories

| Repository | Role |
|------------|------|
| [registry](https://github.com/getskillpack/registry) | Registry API and implementation |
| [skillget-manager](https://github.com/getskillpack/skillget-manager) | Lockfile, HTTP client, install path, **publish** |
| [cli](https://github.com/getskillpack/cli) | `skillget` binary (Go) and optional npm package |

## Install

### npm (Node 18+)

Package **`@getskillpack/cli`**, binary on PATH: **`skillget`**.

```bash
npm install -g @getskillpack/cli
skillget --help
```

### Homebrew (from source)

Formula template: [`packaging/homebrew/skillget.rb`](packaging/homebrew/skillget.rb). After the org tap is published:

```bash
brew tap getskillpack/tap
brew install skillget
```

From a local clone:

```bash
brew install --build-from-source ./packaging/homebrew/skillget.rb
```

### Native binary (Go 1.22+)

Sources: `cmd/skillget`. Dependency: [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager), pinned in `go.mod` (semver). For local development this repo may use a `replace` directive — see the comment in `go.mod`. If you vendor private module paths, set `GOPRIVATE` accordingly.

```bash
go build -o skillget ./cmd/skillget
./skillget --help
./skillget config
```

#### Quick start (first run in a few minutes)

```bash
git clone https://github.com/getskillpack/cli.git && cd cli
go build -o skillget ./cmd/skillget
./skillget config
# Public default registry: https://registry.skpkg.org/api/v1
export SKILLGET_REGISTRY_URL=http://localhost:8080/api/v1   # local registry
./skillget list
./skillget install <skill-name>
```

After `install` you get **`skills.lock`** and **`.skillget/skills/<name>/<version>/`**.

## Commands

| Command | Purpose |
|---------|---------|
| `skillget list [query]` | List / search registry (`GET /skills`, optional `-author`) |
| `skillget search [query]` | Same as `list` |
| `skillget install <name\|name@version>` | Fetch archive, update `skills.lock` |
| `skillget publish … <archive.tar.gz>` | Upload version (`POST /skills`, token required) |
| `skillget config` | Show registry base URL and write-token presence |

### Examples

```bash
export SKILLGET_REGISTRY_URL=http://localhost:3000/api/v1
skillget list
skillget search para --limit 10
skillget install alpha-test-skill
```

Publish (token matches `REGISTRY_WRITE_TOKEN` on the registry):

```bash
export SKILLGET_REGISTRY_URL=http://localhost:3000/api/v1
export SKILLGET_REGISTRY_TOKEN=your-write-token
skillget publish --name my-skill --skill-version 1.0.0 --description "..." --author team ./bundle.tar.gz
# or full manifest JSON:
skillget publish --manifest ./manifest.json ./bundle.tar.gz
```

## Environment variables

| Variable | Purpose |
|----------|---------|
| `SKILLGET_REGISTRY_URL` | Registry API base (default `https://registry.skpkg.org/api/v1`) |
| `SKPKG_REGISTRY_URL` | Legacy URL fallback |
| `SKILLGET_REGISTRY_TOKEN` | Bearer for `publish` (preferred) |
| `SKILLGET_TOKEN` | Short alias for the same |

On HTTP errors the CLI prints short **hints** (401 / 404 / 410 / 409 / 503).

## TypeScript prototype

```bash
npm install
npm run build
node dist/cli.js --help
```

The shipped client for the ecosystem is the **compiled Go `skillget`**; npm remains optional.

## Publish this repo to GitHub

Org: [getskillpack](https://github.com/getskillpack). Canonical repo name: **`cli`** (`getskillpack/cli`). If your local folder is still named `skpkg-cli` for historical reasons, the remote is unchanged.

```bash
cd cli   # or your clone directory, e.g. skpkg-cli
git init
git add .
git commit -m "Initial skillget CLI scaffold"
git remote add origin git@github.com:getskillpack/cli.git
git push -u origin main
```

## License

MIT — see [LICENSE](LICENSE).

## Security

Coordinated disclosure: [SECURITY.md](SECURITY.md).

## Related (public)

- **Registry API:** [docs/registry-api.md](https://github.com/getskillpack/registry/blob/main/docs/registry-api.md); on a deployed registry: `GET /docs/registry-api` (Markdown). Short pointer: [API.md](https://github.com/getskillpack/registry/blob/main/API.md).
- **Organization:** [github.com/getskillpack](https://github.com/getskillpack).
