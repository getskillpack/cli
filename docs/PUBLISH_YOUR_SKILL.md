# Publish your own skill

This guide matches the **`skillget publish`** flow in [`getskillpack/cli`](https://github.com/getskillpack/cli) (Go binary) and the TypeScript prototype in this repo. The registry accepts a **manifest** (JSON) and a **gzip tarball** via `POST /skills`. Full HTTP details: [registry API](https://github.com/getskillpack/registry/blob/main/docs/registry-api.md).

## Prerequisites

1. **Registry URL** — default `https://registry.skpkg.org/api/v1`, or your own (e.g. local dev):

   ```bash
   export SKILLGET_REGISTRY_URL=https://registry.skpkg.org/api/v1
   ```

2. **Write token** — bearer token accepted by the registry (same secret the server configures for uploads, e.g. `REGISTRY_WRITE_TOKEN` on the registry side):

   ```bash
   export SKILLGET_REGISTRY_TOKEN=<secret>
   # alias:
   # export SKILLGET_TOKEN=<secret>
   ```

3. **CLI** — build Go `skillget` from this repo (`go build -o skillget ./cmd/skillget`) or use `node dist/cli.js` after `npm run build`.

4. **Verify**:

   ```bash
   skillget config
   ```

   You should see your registry URL and `write token: set`.

## What goes in the archive

The registry treats the archive as **opaque content** for clients. For agent “skills”, a common layout is a **`SKILL.md`** file (with optional YAML frontmatter) plus any supporting files, similar to Cursor Agent Skills.

Keep paths **stable** inside the tarball (no absolute machine paths). Typically create the archive from **inside** the skill directory so files sit at the root of the tar:

```bash
cd my-skill
tar -czf ../my-skill.bundle.tar.gz SKILL.md README.md
```

Use any filename; the CLI reads the path you pass as the last argument to `publish`.

## Manifest fields

Minimum JSON fields:

- `name` — skill identifier (registry rules apply; use lowercase and hyphens unless your registry allows otherwise).
- `version` — semver string for this upload.

Optional:

- `description` — short text shown in list/search.
- `author` — label for attribution / filtering (`skillget list -author`).

## Publish with flags (Go CLI)

```bash
skillget publish \
  --name my-skill \
  --skill-version 1.0.0 \
  --description "Short description for the catalog" \
  --author my-team \
  ./my-skill.bundle.tar.gz
```

## Publish with a manifest file

`manifest.json`:

```json
{
  "name": "my-skill",
  "version": "1.0.0",
  "description": "Short description for the catalog",
  "author": "my-team"
}
```

```bash
skillget publish --manifest ./manifest.json ./my-skill.bundle.tar.gz
```

Do **not** mix `--manifest` with `--name`, `--skill-version`, `--description`, or `--author` on the same invocation.

## Publish (npm / Node prototype)

Same contract; last argument is the archive path:

```bash
node dist/cli.js publish \
  --name my-skill \
  --skill-version 1.0.0 \
  --description "Short description" \
  --author my-team \
  ./my-skill.bundle.tar.gz
```

## After publish

- Consumers run `skillget install my-skill` or `my-skill@1.0.0`.
- If the server returns **409**, the version already exists—bump `version` or yank the old release per registry policy.
- If you see **401**, fix `SKILLGET_REGISTRY_TOKEN`. **503** often means writes are disabled on that registry instance.

## Example packs to practice

See [Example skill catalog](EXAMPLE_SKILL_CATALOG.md) and the [`examples/`](../examples/) directory in this repo for five small packs with English READMEs you can tarball and publish to a test registry.
