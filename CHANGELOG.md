# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For **user-facing release notes** (RU/EN block per version) and **growth handoff** to CMO, see [docs/GROWTH_RELEASE_CADENCE_RU.md](docs/GROWTH_RELEASE_CADENCE_RU.md).

## [Unreleased]

### Added

- Go integration test `cmd/skillget/registry_integration_test.go`: live `SearchSkills` against the default public registry (opt out with `SKIP_SKILLGET_REGISTRY_INTEGRATION=1`, same env as the npm integration test). `go test -mod=vendor ./...` runs in the **Go** workflow.
- Root `LICENSE` (MIT, aligned with `@getskillpack/cli` metadata) and `SECURITY.md` for coordinated disclosure ahead of public repo visibility.
- Integration test opt-out: set `SKIP_SKILLGET_REGISTRY_INTEGRATION=1` to skip the public-registry smoke test (offline sandboxes only; keep enabled in CI that must assert `registry.skpkg.org`).
- English onboarding tutorial [docs/ZERO_TO_FIRST_SKILL.md](docs/ZERO_TO_FIRST_SKILL.md): install → first skill → verify, with troubleshooting; linked from README, Quick start, example catalog, and the static landing page.

### Changed

- Dependency: `skillget-manager` **v0.1.3** (archive download transport/HTTP hints, README; keep in sync with manager releases).
- CLI: `skillget config -h` / `--help` and rejection of stray arguments on `config`.
- CLI: `skillget <command> -h` / `--help` on `list`, `search`, `install`, and `publish` prints command-specific flags and exits 0 (was a generic error exit).
- CI: committed `vendor/` for private `skillget-manager`; default **Go** workflow job builds with `-mod=vendor` **without** repository secrets (fork PRs included). Second job skips heavy steps when `GETSKILLPACK_ORG_PAT` is absent; with the secret it runs remote `go mod download` / build and checks `vendor/` matches `go.mod`.
- Registry client: wrap transport (`fetch`) failures with a short connectivity/DNS hint; add HTTP hints for 400, 403, and 422 alongside existing status messages.

## [0.1.0] - 2026-03-28

### Added

- Native Go CLI `skillget` (`search`, `install`, `config`, `-V` / `--version`).
- Optional npm/TypeScript prototype (`@getskillpack/cli`) for historical workflows.
- Default registry base URL `https://registry.skpkg.org/api/v1` with overrides via `SKILLGET_REGISTRY_URL` (legacy: `SKPKG_REGISTRY_URL`).
- `skills.lock` and default install layout under `.skillget/skills/<name>/<version>/`.
- Release hygiene: canonical `VERSION` file, version sync check in CI, and this changelog.
