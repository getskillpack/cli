# skillget CLI

Command-line client for the [getskillpack](https://github.com/getskillpack) skill registry (`search`, `install`, `config`).

## Лендинг

- **Статическая страница (hero, как работает, quick start, доверие, футер):** [docs/landing/index.html](docs/landing/index.html) — откройте файл в браузере или задеплойте через GitHub Pages (workflow [.github/workflows/deploy-landing.yml](.github/workflows/deploy-landing.yml); канонический URL: `https://getskillpack.github.io/cli/`).
- **Тексты и чеклист:** [docs/MARKETING_LANDING_AND_GROWTH_RU.md](docs/MARKETING_LANDING_AND_GROWTH_RU.md).

## Демо установки (визуально)

Пример сессии в терминале (как «скриншот» для README):

![skillget: search и install](docs/landing/terminal-demo.svg)

## Репозитории продукта (org)

| Репозиторий | Назначение |
|-------------|------------|
| [registry](https://github.com/getskillpack/registry) | Контракт API и код реестра |
| [skillget-manager](https://github.com/getskillpack/skillget-manager) | Ядро менеджера (lockfile, клиент, установка) |
| [cli](https://github.com/getskillpack/cli) | Бинарь `skillget` (обёртка над менеджером) |

## Нативный бинарник (целевой артефакт, Go 1.22+)

Исходники: `cmd/skillget`. Зависимость: [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager).

```bash
go build -o skillget ./cmd/skillget
./skillget --help
./skillget config
```

## npm-пакет (исторический прототип)

- **npm name:** `@getskillpack/cli`
- **binary:** `skillget` (Node)
- **Node:** 18+

Целевой поставляемый клиент для экосистемы getskillpack — **скомпилированный `skillget` на Go**; npm-обёртка остаётся опциональной и требует отдельного согласования board.

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

- **Стабильный URL документации API registry:** [github.com/getskillpack/registry/blob/main/API.md](https://github.com/getskillpack/registry/blob/main/API.md) (источник правды в репозитории; публичный хост `registry.skpkg.org` — по мере готовности инфраструктуры).
- GitHub org **getskillpack** (onboarding [XDE-3](/XDE/issues/XDE-3)).
- PAT / CI / scope: [docs/GETSKILLPACK_GITHUB_ORG.md](docs/GETSKILLPACK_GITHUB_ORG.md) ([XDE-10](/XDE/issues/XDE-10)).
- Установка skill в Paperclip (board): [docs/PAPERCLIP_SKILL_INSTALL_RU.md](docs/PAPERCLIP_SKILL_INSTALL_RU.md).
- **Куда board вводит PAT:** [docs/BOARD_PAT_QUICK_RU.md](docs/BOARD_PAT_QUICK_RU.md).
- Репозитории org для агентов: [docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md](docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md).
- Позиционирование, лендинг, KPI роста GitHub (без спама): [docs/MARKETING_LANDING_AND_GROWTH_RU.md](docs/MARKETING_LANDING_AND_GROWTH_RU.md).
