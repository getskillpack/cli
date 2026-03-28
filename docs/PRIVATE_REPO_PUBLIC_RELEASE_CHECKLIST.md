# Private → public repository release checklist (getskillpack org)

Use this when the board decides to flip a **private** org repo to **public**. **Agents do not change visibility** in GitHub; a board member performs that step in repository settings after the checklist is complete and a Paperclip ticket records the decision.

For post-launch growth mechanics (stars, traffic baselines, release narrative), use [GITHUB_GROWTH_CHECKLIST.md](GITHUB_GROWTH_CHECKLIST.md).

## Board gate

- [ ] Paperclip ticket (or equivalent) states **which repository**, **why now**, and **who** flips visibility in GitHub UI.
- [ ] No open security incidents or embargoed fixes pending for that repo.

## English README (default branch)

- [ ] **Primary language is English** for the top-level `README.md` (install, purpose, links to registry/API docs as applicable).
- [ ] Badges and links resolve for **anonymous** visitors (no private URLs, no internal-only hosts).
- [ ] “Star if useful” / ecosystem links match board-approved copy; see [MARKETING_LANDING_AND_GROWTH.md](MARKETING_LANDING_AND_GROWTH.md).

## CI green

- [ ] Default branch (usually `main`) passes **required** checks; no intentionally skipped jobs that would mislead external contributors.
- [ ] Workflows that need secrets use `workflow_dispatch` or guarded paths so **fork PRs** do not fail for missing secrets (pattern already used in this repo: [`.github/workflows/getskillpack-org-manual.yml`](../.github/workflows/getskillpack-org-manual.yml)).

## LICENSE

- [ ] `LICENSE` file present at repo root, SPDX identifier agreed with board, consistent with dependencies’ obligations.

## Security basics

- [ ] **No secrets** in tree or history for the default branch (rotate anything that was ever committed; run GitHub secret scanning / partner tools as needed).
- [ ] `SECURITY.md` with **coordinated disclosure** contact (or pointer to org security policy).
- [ ] Dependency updates: Dependabot or an agreed alternative; address **critical** alerts before going public where feasible.
- [ ] Remove or relocate **internal-only** docs, credentials, customer data, and draft board notes from the default branch.

## Version tag and release narrative

- [ ] **Semver tag** aligned with [CHANGELOG.md](../CHANGELOG.md) and [docs/RELEASE.md](RELEASE.md).
- [ ] Optional but recommended: **GitHub Release** with short narrative (template in RELEASE.md).

## After visibility is public

- [ ] Confirm **branch protection** and required reviews still match org policy.
- [ ] Run through [GITHUB_GROWTH_CHECKLIST.md](GITHUB_GROWTH_CHECKLIST.md) for baseline metrics on the newly public repo.

## Org visibility snapshot (engineering audit)

Last reviewed: **2026-03-28** (automated API read; re-check before acting).

| Repository | GitHub visibility |
|------------|-------------------|
| `getskillpack/cli` | private |
| `getskillpack/registry` | private |
| `getskillpack/skillget-manager` | private |
| `getskillpack/landing` | **public** |

Update this table when org membership changes.
