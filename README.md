# skillget CLI

Command-line client for the [getskillpack](https://github.com/getskillpack) skill registry: **`list`**, **`search`**, **`install`**, **`publish`**, **`config`**.

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

Исходники: `cmd/skillget`. Зависимость: [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager) (в этом workspace при необходимости используется `replace` в `go.mod` — см. комментарий в файле).

```bash
go build -o skillget ./cmd/skillget
./skillget --help
./skillget config
```

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

## Related

- **Стабильный URL документации API registry:** [github.com/getskillpack/registry/blob/main/API.md](https://github.com/getskillpack/registry/blob/main/API.md) (источник правды в репозитории; публичный хост `registry.skpkg.org` — по мере готовности инфраструктуры).
- GitHub org **getskillpack** (onboarding [XDE-3](/XDE/issues/XDE-3)).
- PAT / CI / scope: [docs/GETSKILLPACK_GITHUB_ORG.md](docs/GETSKILLPACK_GITHUB_ORG.md) ([XDE-10](/XDE/issues/XDE-10)).
- Установка skill в Paperclip (board): [docs/PAPERCLIP_SKILL_INSTALL_RU.md](docs/PAPERCLIP_SKILL_INSTALL_RU.md).
- **Куда board вводит PAT:** [docs/BOARD_PAT_QUICK_RU.md](docs/BOARD_PAT_QUICK_RU.md).
- Репозитории org для агентов: [docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md](docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md).
