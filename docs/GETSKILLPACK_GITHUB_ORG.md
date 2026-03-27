# GitHub org **getskillpack**: PAT, секреты и автоматизация

Токен **нельзя** коммитить в git, вложения в репозиторий без шифрования или писать в комментарии тикетов Paperclip.

## Имена секретов и переменных окружения

| Где исполняется | Как хранить | Имя (рекомендация) |
|-------------------|-------------|---------------------|
| Локально (разработчик) | Файл `.env` (в `.gitignore`) или менеджер секретов ОС | `GETSKILLPACK_ORG_PAT` |
| GitHub Actions | Repository или Organization secret | `GETSKILLPACK_ORG_PAT` |
| Агент Paperclip (локальный адаптер) | Переменные окружения процесса / секреты адаптера у оператора | `GETSKILLPACK_ORG_PAT` |

Альтернатива для инструментов, ожидающих стандартное имя: экспорт `GITHUB_TOKEN` или `GH_TOKEN` **только в рантайме** из того же значения (не дублировать файлом в репо).

## Минимальные scope по потребителю

Уточняйте у board фактический тип токена (classic vs fine-grained).

| Потребитель | Назначение | Classic PAT (ориентир) | Fine-grained (ориентир) |
|-------------|------------|-------------------------|-------------------------|
| CI / ручная проверка org | `GET /user`, `GET /orgs/getskillpack` | `read:org` | Organization: read, при необходимости metadata |
| Создание репозиториев, настройки репо | API repos под org | `repo`, `write:org` или admin по политике org | Repositories: read/write по списку или всей org |
| Управление участниками org | Teams, members | `admin:org` | Administration согласно политике GitHub |
| Projects / dashboards (GitHub Projects) | project API | `project`, `read:project` / `write:project` по задаче | См. документацию GH для Projects |

Правило: выдавать **минимальный** набор для конкретного workflow; расширять scope только по отдельному тикету.

## Локальная проверка

Из корня `skpkg-cli` (токен только в окружении):

```bash
export GETSKILLPACK_ORG_PAT='...'   # не коммитить
./scripts/gh-org-smoke.sh
```

Скрипт вызывает GitHub API и завершается с ошибкой, если переменная не задана.

## GitHub Actions

- Workflow: [`.github/workflows/getskillpack-org-manual.yml`](../.github/workflows/getskillpack-org-manual.yml) — только **workflow_dispatch**, чтобы не ломать PR без секрета.
- В настройках репозитория или организации: **Settings → Secrets and variables → Actions** → создать `GETSKILLPACK_ORG_PAT`.
- Запуск: **Actions → getskillpack org (manual) → Run workflow**.

## Paperclip

- Значение PAT передаётся через **секреты/ENV у оператора адаптера**, не через описание задачи.
- Не публиковать токен в [XDE-10](/XDE/issues/XDE-10) и связанных тикетах; для статуса указывать только факт «секрет заведён в …».

## Company skill (Paperclip)

Исходник skill: [`skills/getskillpack-github-org/SKILL.md`](../skills/getskillpack-github-org/SKILL.md). Импорт в библиотеку компании — с абсолютного пути к этой папке на машине, где доступен API (board / CEO с правом мутаций skills).

## Связанные задачи

- Контекст org: [XDE-3](/XDE/issues/XDE-3).
- Этот документ закрывает требования [XDE-10](/XDE/issues/XDE-10) по безопасному подключению и документированию scope.
