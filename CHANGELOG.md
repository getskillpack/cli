# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- English onboarding tutorial [docs/ZERO_TO_FIRST_SKILL.md](docs/ZERO_TO_FIRST_SKILL.md): install → first skill → verify, with troubleshooting; linked from README, Quick start, example catalog, and the static landing page.

## [0.1.0] - 2026-03-28

### Added

- Native Go CLI `skillget` (`search`, `install`, `config`, `-V` / `--version`).
- Optional npm/TypeScript prototype (`@getskillpack/cli`) for historical workflows.
- Default registry base URL `https://registry.skpkg.org/api/v1` with overrides via `SKILLGET_REGISTRY_URL` (legacy: `SKPKG_REGISTRY_URL`).
- `skills.lock` and default install layout under `.skillget/skills/<name>/<version>/`.
- Release hygiene: canonical `VERSION` file, version sync check in CI, and this changelog.
