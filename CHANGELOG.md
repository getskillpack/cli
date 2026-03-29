# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For **user-facing release notes** (RU/EN block per version) and **growth handoff** to CMO, see [docs/GROWTH_RELEASE_CADENCE_RU.md](docs/GROWTH_RELEASE_CADENCE_RU.md).

## [Unreleased]

### Changed

- [RELEASE.md](docs/RELEASE.md): в чеклисте «Before you cut a release» добавлена явная ссылка на [REGISTRY_CLIENT_CONTRACT.md](https://github.com/getskillpack/skillget-manager/blob/main/docs/REGISTRY_CLIENT_CONTRACT.md) рядом с registry API и релизами `skillget-manager`.
- README and [docs/QUICKSTART.md](docs/QUICKSTART.md): explicit **~60 second** npm quickstart (config → list → install), links to [registry.skpkg.org](https://registry.skpkg.org/) and [landing](https://getskillpack.github.io/landing/); Go CLI examples use `-limit` instead of `--limit` for `list` / `search`.

### Added

- Workflow **Registry smoke (live)** (`.github/workflows/registry-smoke.yml`): `workflow_dispatch` + weekly cron runs live `SearchSkills` + `DownloadSkillArchive` integration tests (`TestPublicRegistry.*Integration`) without `-short` to monitor production `registry.skpkg.org` without failing default PR/push CI.
- Go integration test `cmd/skillget/registry_integration_test.go`: live `SearchSkills` and `DownloadSkillArchive` (default skill `para-memory-files`, override with `SKILLGET_SMOKE_INSTALL_SPEC`). Skipped when `SKIP_SKILLGET_REGISTRY_INTEGRATION=1` (npm parity) or under `go test -short` (default in **Go** CI). Full run: `go test -mod=vendor ./cmd/skillget/ -run 'TestPublicRegistry.*Integration'`.
- Root `LICENSE` (MIT, aligned with `@getskillpack/cli` metadata) and `SECURITY.md` for coordinated disclosure ahead of public repo visibility.
- Integration test opt-out: set `SKIP_SKILLGET_REGISTRY_INTEGRATION=1` to skip the public-registry smoke test (offline sandboxes only; keep enabled in CI that must assert `registry.skpkg.org`).
- English onboarding tutorial [docs/ZERO_TO_FIRST_SKILL.md](docs/ZERO_TO_FIRST_SKILL.md): install → first skill → verify, with troubleshooting; linked from README, Quick start, example catalog, and the static landing page.

### Changed

- [RELEASE.md](docs/RELEASE.md): **Public launch readiness (CLI)** section (CI, docs funnel, live smoke, npm parity, publish vs automated token) and link to [docs/README.md](docs/README.md).
- Dependency: `skillget-manager` **v0.1.4** (registry compiled-core JSON: `versions` map + semver latest + optional read bearer; [REGISTRY_CLIENT_CONTRACT.md](https://github.com/getskillpack/skillget-manager/blob/main/docs/REGISTRY_CLIENT_CONTRACT.md)).
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
