# Release process — `getskillpack/cli`

Predictable releases use **Semantic Versioning** (`MAJOR.MINOR.PATCH`), Git tags `vMAJOR.MINOR.PATCH`, and an updated **Keep a Changelog**-style [CHANGELOG.md](../CHANGELOG.md).

**Growth cadence** (release rhythm, user-facing changelog blocks, CMO handoff after significant releases): [GROWTH_RELEASE_CADENCE_RU.md](GROWTH_RELEASE_CADENCE_RU.md).

## Before you cut a release

1. **Contracts** — Confirm HTTP shapes and breaking changes with the registry contract in [`getskillpack/registry` API.md](https://github.com/getskillpack/registry/blob/main/API.md) and with [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager) releases if the CLI behavior depends on new APIs.
2. **Changelog** — Move items from `## [Unreleased]` to a dated `## [X.Y.Z] - YYYY-MM-DD` section in `CHANGELOG.md`.
3. **Version bump** — Set the **same** version string in all of:
   - [VERSION](../VERSION) (single line, no `v` prefix)
   - [package.json](../package.json) `version` (npm metadata)
   - [cmd/skillget/main.go](../cmd/skillget/main.go) `const version = "…"`
4. **CI** — Push a branch or PR; `Go` workflow runs `scripts/check-version.sh` so the three values cannot drift.

## Tag and publish

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main --tags
```

Create a **GitHub Release** from the tag (release notes can summarize `CHANGELOG.md`).

## Artifacts

Prebuilt binaries are not yet automated in CI; users build with `go build` as documented in [QUICKSTART.md](QUICKSTART.md). When board approves, add a tag-triggered workflow (for example GoReleaser) without embedding secrets in the repository.

## GitHub Release narrative (template)

Use this shape on the GitHub **Releases** page so early adopters get a story, not only a tag. Replace placeholders; keep it honest and short.

1. **What shipped** — One paragraph: user-visible commands, fixes, or contract alignment with the registry.
2. **Why it matters** — One paragraph: who should upgrade (CLI users, integrators, skill authors) and any migration note.
3. **What’s next** — Bullets: next likely focus (e.g. binary publishing, docs URL), with links to Issues if they exist.

**Example opening line:** “skillget vX.Y.Z tightens … and stays compatible with registry API … per [registry-api.md](https://github.com/getskillpack/registry/blob/main/docs/registry-api.md).”

### GitHub Release narrative — Template B (“Problem → fix → upgrade”)

Use when the headline is a **user-visible break**, a **security** fix, or a **compatibility** correction. Keep to three short blocks; link to `CHANGELOG.md` for the full list.

1. **Problem** — One or two sentences: what broke, for whom, and severity (honest, no FUD).
2. **Fix** — What we changed in the CLI or contract; name the registry API version or tag if relevant.
3. **Upgrade** — Exact action: bump tag, rebuild from source, env var or config migration — plus rollback note if any.

**Example opening line:** “skillget vX.Y.Z fixes …; upgrade if you use … with registry ≥ …”

Operational checklist for each cut: [GITHUB_GROWTH_CHECKLIST.md](GITHUB_GROWTH_CHECKLIST.md) (stars/CTAs are product surfaces; releases are the habit). Experiment log for template choice: [GROWTH_EXPERIMENTS_V4.md](GROWTH_EXPERIMENTS_V4.md).
