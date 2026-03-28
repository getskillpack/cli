# skillget CLI

Official CLI for the [getskillpack](https://github.com/getskillpack) skill registry: **`list`**, **`search`**, **`install`**, **`publish`**, **`config`**.

## At a glance

**Who it’s for**

- **Maintainers and skill authors** — versioned skills, trusted sources, optional self-hosted registry.
- **Platform / DevOps** — one predictable flow for skill artifacts next to your existing supply chain.
- **Teams already using npm, PyPI, or Packagist** — same *search → install → lockfile* muscle memory, applied to agent/IDE **skills**.

**Positioning** — *Skill manager and registry that fit the developer workflow you already have*: open, predictable installs and a clear HTTP contract — not a replacement for language package managers.

**Try it in one command** (Node 18+):

```bash
npm install -g @getskillpack/cli && skillget search
```

Build from Go source instead? See **Установка (канон)** below (`go build` + `skillget config`) or [Quick start](docs/QUICKSTART.md).

**Docs (start here)**

- **[Zero → first skill](docs/ZERO_TO_FIRST_SKILL.md)** — end-to-end tutorial, copy-paste, common failures.
- **[Quick start](docs/QUICKSTART.md)** — env vars, `search` / `install` / `config`.
- **Registry contract:** [registry-api.md](https://github.com/getskillpack/registry/blob/main/docs/registry-api.md) · **[Publish a skill](docs/PUBLISH_YOUR_SKILL.md)**.

### vs familiar package registries (short)

| | npm · PyPI · Packagist | skillget / getskillpack |
|---|------------------------|-------------------------|
| Unit of install | Language package | **Skill** tarball + manifest |
| Discover + pin | registry + lockfile | **`skillget search` / `install` + `skills.lock`** |
| On-disk tree | `node_modules` / site-packages / `vendor` | **`.skillget/skills/<name>/<version>/`** |

Expanded matrix (scopes, auth, CI patterns) lives in a dedicated doc in this repo as that work lands; positioning context: [MARKETING_LANDING_AND_GROWTH.md](docs/MARKETING_LANDING_AND_GROWTH.md). Hands-on discovery: [Example skill catalog](docs/EXAMPLE_SKILL_CATALOG.md).

**If this is useful:** starring [`getskillpack/cli`](https://github.com/getskillpack/cli), [`getskillpack/registry`](https://github.com/getskillpack/registry), and [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager) helps discovery — no bots or reciprocal schemes; see [docs/MARKETING_LANDING_AND_GROWTH.md](docs/MARKETING_LANDING_AND_GROWTH.md).

**Public landing (hero + funnel copy):** [getskillpack.github.io/landing/](https://getskillpack.github.io/landing/) · source mirror: [docs/landing/](docs/landing/).

## User docs (English)

- **[Zero → first skill (tutorial)](docs/ZERO_TO_FIRST_SKILL.md)** — numbered path from install through first `install` and verification; copy-paste blocks; troubleshooting for the three most common failures.
- **[Quick start](docs/QUICKSTART.md)** — build, env vars, `search` / `install` / `config`.
- **[Example skill catalog](docs/EXAMPLE_SKILL_CATALOG.md)** — CLI discovery plus five example packs under `examples/`.
- **[Publish your own skill](docs/PUBLISH_YOUR_SKILL.md)** — tarball layout, manifest, and `skillget publish` (aligned with `getskillpack/cli` and this repo’s prototype).
- **[Release process](docs/RELEASE.md)** — semver, tags, changelog, alignment with registry API.
- **[Changelog](CHANGELOG.md)** — version history ([Keep a Changelog](https://keepachangelog.com/en/1.1.0/)).

## Лендинг

- **Публичный сайт (GitHub Pages):** репозиторий **[getskillpack/landing](https://github.com/getskillpack/landing)** (публичный) — канонический URL **`https://getskillpack.github.io/landing/`**. Зеркало статики: каталог **`docs/`** в репо `landing` (ветка `main`, источник Pages — `/docs`). Копируйте из [docs/landing/](docs/landing/) в [`getskillpack/landing` → `docs/`](https://github.com/getskillpack/landing/tree/main/docs). В `cli` при публичном репо остаётся опциональный [.github/workflows/deploy-landing.yml](.github/workflows/deploy-landing.yml).
- **Тексты и KPI (EN, для board/публичики):** [docs/MARKETING_LANDING_AND_GROWTH.md](docs/MARKETING_LANDING_AND_GROWTH.md) · внутренний зеркальный документ: [docs/MARKETING_LANDING_AND_GROWTH_RU.md](docs/MARKETING_LANDING_AND_GROWTH_RU.md).

## Демо установки (визуально)

Пример сессии в терминале (как «скриншот» для README):

![skillget: search и install](docs/landing/terminal-demo.svg)

Интерактивно в терминале: `asciinema play docs/asciinema/skillget-quickstart.cast` (подробности в разделе **Нативный бинарник (Go 1.22+)** ниже).

## Репозитории продукта (org)

| Репозиторий | Назначение |
|-------------|------------|
| [registry](https://github.com/getskillpack/registry) | Контракт API и код реестра |
| [skillget-manager](https://github.com/getskillpack/skillget-manager) | Lockfile, HTTP-клиент, установка, **publish** |
| [cli](https://github.com/getskillpack/cli) | Бинарь `skillget` (Go) и опционально npm-пакет |

## Установка (канон)

### npm (Node 18+)

Пакет **`@getskillpack/cli`**, бинарь на PATH: **`skillget`**.

```bash
npm install -g @getskillpack/cli
skillget --help
```

### Homebrew (из исходников)

Формула-шаблон: [`packaging/homebrew/skillget.rb`](packaging/homebrew/skillget.rb). После публикации tap org **getskillpack**:

```bash
brew tap getskillpack/tap
brew install skillget
```

Локально из клона:

```bash
brew install --build-from-source ./packaging/homebrew/skillget.rb
```

### Нативный бинарник (Go 1.22+)

Исходники: `cmd/skillget`. Зависимость: [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager) пин в `go.mod` (semver). Пока репозитории org приватные, перед `go build` / `go test` задайте `GOPRIVATE` и доступ Git к GitHub — см. [docs/BOARD_PAT_QUICK_RU.md](docs/BOARD_PAT_QUICK_RU.md) § 4.

```bash
go build -o skillget ./cmd/skillget
./skillget --help
./skillget config
```

#### Быстрый старт (первый запуск за пару минут)

```bash
git clone https://github.com/getskillpack/cli.git && cd cli
go build -o skillget ./cmd/skillget
./skillget config
# Публичный реестр по умолчанию: https://registry.skpkg.org/api/v1
export SKILLGET_REGISTRY_URL=http://localhost:8080/api/v1   # локальный registry
./skillget list
./skillget install <имя-скилла>
```

После `install` появятся **`skills.lock`** и **`.skillget/skills/<name>/<version>/`**.

#### Демо в терминале (asciinema)

Локально (нужен [asciinema](https://asciinema.org/docs/installation)):

```bash
asciinema play docs/asciinema/skillget-quickstart.cast
```

Исходник записи: [`docs/asciinema/skillget-quickstart.cast`](docs/asciinema/skillget-quickstart.cast). После выкладки ролика на asciinema.org board может добавить бейдж вида `[![asciicast](https://asciinema.org/a/<id>.svg)](https://asciinema.org/a/<id>)` в этот раздел.

## Команды

| Команда | Назначение |
|---------|------------|
| `skillget list [query]` | Список / поиск в реестре (`GET /skills`, опционально `-author`) |
| `skillget search [query]` | То же, что `list` |
| `skillget install <name\|name@version>` | Скачать архив, обновить `skills.lock` |
| `skillget publish … <archive.tar.gz>` | Залить версию (`POST /skills`, нужен токен) |
| `skillget config` | Показать базовый URL реестра и наличие write-токена |

### Примеры

```bash
export SKILLGET_REGISTRY_URL=http://localhost:3000/api/v1
skillget list
skillget search para --limit 10
skillget install alpha-test-skill
```

Публикация (токен совпадает с `REGISTRY_WRITE_TOKEN` на сервере реестра):

```bash
export SKILLGET_REGISTRY_URL=http://localhost:3000/api/v1
export SKILLGET_REGISTRY_TOKEN=your-write-token
skillget publish --name my-skill --skill-version 1.0.0 --description "..." --author team ./bundle.tar.gz
# или полный manifest JSON:
skillget publish --manifest ./manifest.json ./bundle.tar.gz
```

## Переменные окружения

| Переменная | Назначение |
|------------|------------|
| `SKILLGET_REGISTRY_URL` | База API реестра (по умолчанию `https://registry.skpkg.org/api/v1`) |
| `SKPKG_REGISTRY_URL` | Устаревший fallback для URL |
| `SKILLGET_REGISTRY_TOKEN` | Bearer для `publish` (предпочтительно) |
| `SKILLGET_TOKEN` | Короткий алиас для того же |

При ошибках HTTP CLI добавляет короткие **hint** (401 / 404 / 410 / 409 / 503).

## Прототип на TypeScript

```bash
npm install
npm run build
node dist/cli.js --help
```

Целевой поставляемый клиент для экосистемы getskillpack — **скомпилированный `skillget` на Go**; npm остаётся опциональным.

После `install` создаётся или обновляется **`skills.lock`** в текущей директории. Архив по умолчанию: `./.skillget/skills/<name>/<version>/`.

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

## License

MIT — see [LICENSE](LICENSE).

## Security

Coordinated disclosure: [SECURITY.md](SECURITY.md).

## Related

- **Registry API (канон):** [docs/registry-api.md](https://github.com/getskillpack/registry/blob/main/docs/registry-api.md); на развёрнутом реестре: `GET /docs/registry-api` (Markdown). Корневой [API.md](https://github.com/getskillpack/registry/blob/main/API.md) — короткий указатель для старых ссылок.
- GitHub org **getskillpack** (onboarding [XDE-3](/XDE/issues/XDE-3)).
- PAT / CI / scope: [docs/GETSKILLPACK_GITHUB_ORG.md](docs/GETSKILLPACK_GITHUB_ORG.md) ([XDE-10](/XDE/issues/XDE-10)).
- Установка skill в Paperclip (board): [docs/PAPERCLIP_SKILL_INSTALL_RU.md](docs/PAPERCLIP_SKILL_INSTALL_RU.md).
- **Куда board вводит PAT:** [docs/BOARD_PAT_QUICK_RU.md](docs/BOARD_PAT_QUICK_RU.md).
- Репозитории org для агентов: [docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md](docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md).
