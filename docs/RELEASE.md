# Release process — `getskillpack/cli`

Predictable releases use **Semantic Versioning** (`MAJOR.MINOR.PATCH`), Git tags `vMAJOR.MINOR.PATCH`, and an updated **Keep a Changelog**-style [CHANGELOG.md](../CHANGELOG.md).

**Growth cadence** (release rhythm, user-facing changelog blocks, CMO handoff after significant releases): [GROWTH_RELEASE_CADENCE_RU.md](GROWTH_RELEASE_CADENCE_RU.md).

**Doc index:** [docs/README.md](README.md) (user vs maintainer paths).

## Public launch readiness (CLI)

Use this in addition to **Before you cut a release** when the goal is “ready for broad public use”, not only a semver tag:

- **CI** — **Go** workflow green on `main` (includes `go test -short`; does not require live registry).
- **Docs** — README and [docs/README.md](README.md) point to [QUICKSTART.md](QUICKSTART.md), [ZERO_TO_FIRST_SKILL.md](ZERO_TO_FIRST_SKILL.md), and [PUBLISH_YOUR_SKILL.md](PUBLISH_YOUR_SKILL.md).
- **Live registry** — **Registry smoke (live)** (`workflow_dispatch` or cron) green recently, or release notes honestly state a production outage (see live smoke step below).
- **npm** — `npm run test:integration` still matches production expectations when the registry is up (`SKIP_SKILLGET_REGISTRY_INTEGRATION` documented for offline only).
- **Publish** — `skillget publish` exercised manually with `SKILLGET_REGISTRY_TOKEN` (or equivalent) against the intended registry. **Automated** publish smoke in GitHub Actions would require a **write** token stored as an Actions secret — coordinate with org admins; it is intentionally **not** in the default public CI path.

Org-wide visibility checklist (repos, visibility, legal): [PRIVATE_REPO_PUBLIC_RELEASE_CHECKLIST.md](PRIVATE_REPO_PUBLIC_RELEASE_CHECKLIST.md).

## Before you cut a release

1. **Contracts** — Confirm HTTP shapes and breaking changes with the registry contract in [`getskillpack/registry` API.md](https://github.com/getskillpack/registry/blob/main/API.md) and with [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager) releases if the CLI behavior depends on new APIs.
2. **Changelog** — Move items from `## [Unreleased]` to a dated `## [X.Y.Z] - YYYY-MM-DD` section in `CHANGELOG.md`.
3. **Version bump** — Set the **same** version string in all of:
   - [VERSION](../VERSION) (single line, no `v` prefix)
   - [package.json](../package.json) `version` (npm metadata)
   - [cmd/skillget/main.go](../cmd/skillget/main.go) `const version = "…"`
4. **Live registry smoke** — When `registry.skpkg.org` is healthy, run GitHub Actions **Registry smoke (live)** (`workflow_dispatch`) or locally: `go test -mod=vendor ./cmd/skillget/ -run 'TestPublicRegistry.*Integration'`. If production is down, note it in the release narrative rather than blocking the tag on this step alone.
5. **CI** — Push a branch or PR; **Go** workflow runs `scripts/check-version.sh` so the three values cannot drift.

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
