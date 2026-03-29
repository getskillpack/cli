# Example skill catalog

This page lists **starter skills and packs** you can try with the [getskillpack](https://github.com/getskillpack) CLI and copies that ship **inside this repository** for learning and publishing practice.

## Discover skills on the registry (CLI)

Default API base: `https://registry.skpkg.org/api/v1` (override with `SKILLGET_REGISTRY_URL`).

```bash
skillget config
skillget list
skillget list para
skillget search -limit 50
skillget install <name>
skillget install <name>@<semver>
```

The live catalog depends on what publishers have uploaded. If a name below returns 404, run `skillget list` without a query to see what is available on your registry.

## Curated names often used in docs and tests

These identifiers appear in this repo’s quick start, integration tests, or examples. They may or may not exist on every registry deployment—**verify with `skillget list <name>`**.

| Name | Notes |
|------|--------|
| `para-memory-files` | Default skill in the Node integration test (`test/integration-registry-install.mjs`); used to validate install + checksum against production. |
| `alpha-test-skill` | Appears in README / quick start as a generic install example. |

## Example packs in this repository (source)

The following **five** packs live under [`examples/`](../examples/). Each has an English `README.md` and a minimal `SKILL.md` you can archive and publish (see [Publish your own skill](PUBLISH_YOUR_SKILL.md)).

| Pack directory | Intent |
|----------------|--------|
| [`examples/commit-message-helper`](../examples/commit-message-helper/) | Conventional commit hints and message structure. |
| [`examples/pr-description-draft`](../examples/pr-description-draft/) | Scaffold for PR summaries and risk notes. |
| [`examples/security-review-pass`](../examples/security-review-pass/) | Lightweight security checklist for diffs. |
| [`examples/onboarding-checklist`](../examples/onboarding-checklist/) | New-hire / new-repo orientation steps. |
| [`examples/docs-style-pass`](../examples/docs-style-pass/) | Consistency pass for technical docs. |

Clone the repo and open `examples/README.md` for a short index.

## Related

- [Zero to first skill](ZERO_TO_FIRST_SKILL.md) — end-to-end tutorial for newcomers.
- [Quick start](QUICKSTART.md) — build, env vars, search / install.
- [Publish your own skill](PUBLISH_YOUR_SKILL.md) — tarball layout and `skillget publish`.
- Registry contract: [getskillpack/registry — API.md](https://github.com/getskillpack/registry/blob/main/API.md).
