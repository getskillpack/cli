---
name: getskillpack-github-org
description: >
  Безопасная работа с GitHub-организацией getskillpack: PAT только через секреты
  (env, GitHub Actions, Paperclip adapter), без коммитов и без тикетов. См. документ
  в этом репозитории.
---

# GitHub org getskillpack

## Когда использовать

- Нужны операции с org **getskillpack** (репозитории, настройки, API) через PAT.
- Настройка CI или локального окружения с доступом к org.

## Правила

- **Никогда** не вставлять PAT в комментарии задач, README, git или логи.
- Хранить в `GETSKILLPACK_ORG_PAT` (или эквивалентном секрете CI). См. [docs/GETSKILLPACK_GITHUB_ORG.md](../../docs/GETSKILLPACK_GITHUB_ORG.md).
- Выдавать минимальные GitHub scopes под конкретный сценарий (таблица в том же документе).

## Действия

1. Прочитать `docs/GETSKILLPACK_GITHUB_ORG.md`.
2. Для проверки локально: `export GETSKILLPACK_ORG_PAT=...` и `./scripts/gh-org-smoke.sh`.
3. Для CI: завести secret `GETSKILLPACK_ORG_PAT` и запускать workflow **getskillpack org (manual)**.

## Импорт в Paperclip

Локальный путь к каталогу `skills/getskillpack-github-org` этого репозитория — в company skills через `POST /api/companies/{companyId}/skills/import` с `source` = абсолютный путь к каталогу skill.
