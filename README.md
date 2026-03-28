# skillget CLI

Command-line client for the [getskillpack](https://github.com/getskillpack) skill registry (`search`, `install`, `config`).

## Репозитории продукта (org)

| Репозиторий | Назначение |
|-------------|------------|
| [registry](https://github.com/getskillpack/registry) | Контракт API и код реестра |
| [skillget-manager](https://github.com/getskillpack/skillget-manager) | Ядро менеджера (lockfile, клиент, установка) |
| [cli](https://github.com/getskillpack/cli) | Бинарь `skillget` (обёртка над менеджером) |

## Package

- **npm name:** `@getskillpack/cli`
- **binary:** `skillget`
- **Node:** 18+

## Usage

```bash
npm install
npm run build
node dist/cli.js --help
```

Against a local registry (e.g. MVP app):

```bash
export SKILLGET_REGISTRY_URL=http://localhost:3000/api/v1
skillget search
skillget install alpha-test-skill
```

Default registry base is `https://registry.skpkg.org/api/v1`. Override with **`SKILLGET_REGISTRY_URL`**; **`SKPKG_REGISTRY_URL`** is still read as a legacy fallback.

After `install`, the CLI writes or merges **`skills.lock`** in the current working directory (pinned skill versions).

Default install path for archives: `./.skillget/skills/<name>/<version>/`.

## Publish to GitHub

Org: [getskillpack](https://github.com/getskillpack). Каноническое имя репозитория на GitHub: **`cli`** (`getskillpack/cli`). Локальная папка в workspace Paperclip может называться `skpkg-cli` по истории — это не меняет remote.

```bash
cd cli   # или ваша локальная папка клона, например skpkg-cli
git init
git add .
git commit -m "Initial skillget CLI scaffold"
git remote add origin git@github.com:getskillpack/cli.git
git push -u origin main
```

## Related

- Registry API: [registry/API.md](https://github.com/getskillpack/registry/blob/main/API.md) (локально: `../skpkg-registry/API.md`; хост `registry.skpkg.org` — placeholder до отдельной задачи).
- GitHub org **getskillpack** (onboarding [XDE-3](/XDE/issues/XDE-3)).
- PAT / CI / scope: [docs/GETSKILLPACK_GITHUB_ORG.md](docs/GETSKILLPACK_GITHUB_ORG.md) ([XDE-10](/XDE/issues/XDE-10)).
- Установка skill в Paperclip (board): [docs/PAPERCLIP_SKILL_INSTALL_RU.md](docs/PAPERCLIP_SKILL_INSTALL_RU.md).
- **Куда board вводит PAT:** [docs/BOARD_PAT_QUICK_RU.md](docs/BOARD_PAT_QUICK_RU.md).
- Репозитории org для агентов: [docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md](docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md).
