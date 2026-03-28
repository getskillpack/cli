# Zero to first skill (tutorial, English)

Follow these steps in order. You need a **terminal**, **network access** to the registry API, and either **Node.js 18+** (npm install) or **Go 1.22+** (build from source). The **supported** end-user path is the **Go binary** named `skillget`; npm is optional.

Default registry base URL: `https://registry.skpkg.org/api/v1` (no env var required).

---

## Step 1 — Install the CLI

Pick **one** path.

### Option A — npm (fastest if you already use Node)

```bash
npm install -g @getskillpack/cli
skillget --help
skillget -V
```

If `skillget` is not found, see [Troubleshooting — `command not found`](#1-skillget-command-not-found-after-npm-install--g).

### Option B — Build from source (Go)

```bash
git clone https://github.com/getskillpack/cli.git
cd cli
go build -o skillget ./cmd/skillget
./skillget --help
./skillget -V
```

Install [Go](https://go.dev/dl/) if `go` is missing.

---

## Step 2 — Confirm registry settings

```bash
skillget config
```

You should see the resolved registry URL (default production URL unless you override it).

To use a **local or staging** registry:

```bash
export SKILLGET_REGISTRY_URL=http://localhost:3000/api/v1
skillget config
```

---

## Step 3 — Find a skill to install

List what the registry exposes (trim output with a query if you want):

```bash
skillget list
skillget search para
```

Pick a **name** from the output (exact `name` field). Docs and tests often mention `para-memory-files` or `alpha-test-skill`; either may or may not exist on your registry—**always confirm with `list` / `search`**.

---

## Step 4 — Install one skill

Replace `<skill-name>` with a name from Step 3:

```bash
mkdir -p ~/try-skillget && cd ~/try-skillget
skillget install <skill-name>
```

Optional: pin a version:

```bash
skillget install <skill-name>@1.2.3
```

---

## Step 5 — Verify success

After a successful install, the **current directory** should contain:

1. **`skills.lock`** — JSON with pinned skill names and versions.
2. **`.skillget/skills/<name>/<version>/`** — downloaded archive(s).

Quick checks:

```bash
test -f skills.lock && echo "lockfile OK"
ls -la .skillget/skills/
```

Optional: inspect the archive (name varies; use tab completion):

```bash
ls .skillget/skills/*/*/
```

Extract when you need files on disk (example):

```bash
tar -tzf .skillget/skills/<name>/<version>/*.tar.gz | head
```

---

## Troubleshooting (top failure modes)

### 1. `skillget: command not found` after `npm install -g`

- **Cause:** npm’s global `bin` directory is not on your `PATH`.
- **Fix:** Run `npm bin -g` and add that directory to `PATH`, or call the CLI via `npx @getskillpack/cli --help`, or use the **Go build** path (Step 1B) and run `./skillget` from the folder where you built it.

### 2. Cannot reach registry (connection refused, timeout, TLS error, or HTTP 503)

- **Cause:** Wrong base URL, offline network, firewall, or registry downtime.
- **Fix:** Run `skillget config` and confirm `SKILLGET_REGISTRY_URL`. For a local registry, start the server first, then `export SKILLGET_REGISTRY_URL=http://localhost:<port>/api/v1` (include the `/api/v1` suffix as required by your deployment). Retry `skillget list`.

### 3. Skill not found, “no installable versions”, or HTTP 404

- **Cause:** Typo in the skill name, skill not published to **this** registry, or empty catalog.
- **Fix:** Run `skillget list` (no query) and pick an exact name from the results. If the catalog is empty, you need a registry that has published skills or [publish your own](PUBLISH_YOUR_SKILL.md) to that instance.

---

## Next steps

- **[Quick start](QUICKSTART.md)** — env vars and command reference.
- **[Example skill catalog](EXAMPLE_SKILL_CATALOG.md)** — discovery tips and packs under `examples/`.
- **Registry contract:** [getskillpack/registry — API.md](https://github.com/getskillpack/registry/blob/main/API.md).
