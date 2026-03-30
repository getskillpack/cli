# Участие в разработке `getskillpack/cli`

Спасибо за интерес к репозиторию официального CLI **`skillget`**. Ниже — минимум, чтобы собрать проект и открыть осмысленный PR; подробные шаги и контекст — в ссылках, без копирования длинных инструкций.

## Что почитать в первую очередь

- **Сборка, переменные окружения, команды:** [docs/QUICKSTART.md](docs/QUICKSTART.md)
- **Матрица совместимости** (CLI, skillget-manager, registry): [docs/COMPATIBILITY_MATRIX_RU.md](docs/COMPATIBILITY_MATRIX_RU.md)
- **Индекс документации:** [docs/README.md](docs/README.md)
- **Обзор репозитория и ссылок на смежные репо:** [README.md](README.md) (разделы *Docs*, *User docs*, *Product repositories*)
- **Релизы и semver:** [docs/RELEASE.md](docs/RELEASE.md) и [CHANGELOG.md](CHANGELOG.md)

## Требования к окружению

- **Go 1.22+** (см. `go.mod` / `toolchain` в корне).
- Для работы с npm-обёрткой **`@getskillpack/cli`**: Node.js **18+** (см. [README.md](README.md), раздел *Install*).

## Сборка из исходников

Из корня репозитория:

```bash
go build -o skillget ./cmd/skillget
./skillget --help
```

Детали и настройка registry URL — в [docs/QUICKSTART.md](docs/QUICKSTART.md).

### Приватный модуль `skillget-manager`

Для `go build` / `go test` при необходимости доступа к приватным модулям GitHub org настройте `GOPRIVATE`, `GONOSUMDB` и учётные данные git — чеклист: [docs/BOARD_PAT_QUICK_RU.md](docs/BOARD_PAT_QUICK_RU.md) (в т.ч. § про Go modules). **Не коммитьте** токены и PAT в репозиторий.

## Тесты

То, что гоняет CI по умолчанию (без живого registry):

```bash
go test -mod=vendor -short ./...
```

Опционально — интеграционные / smoke-сценарии против production registry, переменные `SKIP_SKILLGET_REGISTRY_INTEGRATION`, `SKILLGET_SMOKE_INSTALL_SPEC`: полное описание в [docs/QUICKSTART.md](docs/QUICKSTART.md) (раздел про тесты).

## Issues и pull requests

1. **Issue** — опишите воспроизведение, ожидаемое и фактическое поведение, версию CLI (`skillget -V`) и при необходимости URL registry.
2. **PR** — нацеливайте на ветку **`main`**, одна логическая тема на PR; для пользовательски заметных изменений обновляйте [CHANGELOG.md](CHANGELOG.md) (см. [docs/RELEASE.md](docs/RELEASE.md)).
3. Агентам Paperclip и автоматизации в org **getskillpack**: гигиена PAT, ветки и push — [docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md](docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md).

Контракт registry и стабильность API — в репозитории [`getskillpack/registry`](https://github.com/getskillpack/registry); клиентский контракт — в [`getskillpack/skillget-manager`](https://github.com/getskillpack/skillget-manager) (`docs/REGISTRY_CLIENT_CONTRACT.md`), без дублирования здесь.

## Безопасность

Сообщения об уязвимостях — по [SECURITY.md](SECURITY.md).
