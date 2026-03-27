# skpkg CLI

Command-line client for the [skpkg](https://github.com/getskillpack) skill registry (`search`, `install`, local config).

## Package

- **npm name:** `@getskillpack/cli`
- **binary:** `skpkg`
- **Node:** 18+

## Usage

```bash
npm install
npm run build
node dist/cli.js --help
```

Against a local registry (e.g. MVP app):

```bash
export SKPKG_REGISTRY_URL=http://localhost:3000/api/v1
skpkg search
skpkg install alpha-test-skill
```

Default registry base is `https://registry.skpkg.org/api/v1` (override with `SKPKG_REGISTRY_URL`).

## Publish to GitHub

Org: [getskillpack](https://github.com/getskillpack). Suggested repo name: `cli` or `skpkg-cli`.

```bash
cd skpkg-cli
git init
git add .
git commit -m "Initial skpkg CLI scaffold"
git remote add origin git@github.com:getskillpack/cli.git
git push -u origin main
```

## Related

- Registry API: see `../skpkg-registry/API.md` in this workspace.
- Naming: `skpkg` toolchain and GitHub org **getskillpack** (onboarding task XDE-3).
- PAT / CI / scope: [docs/GETSKILLPACK_GITHUB_ORG.md](docs/GETSKILLPACK_GITHUB_ORG.md) ([XDE-10](/XDE/issues/XDE-10)).
- Установка skill в Paperclip (board): [docs/PAPERCLIP_SKILL_INSTALL_RU.md](docs/PAPERCLIP_SKILL_INSTALL_RU.md).
- Репозитории org для агентов: [docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md](docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md).
