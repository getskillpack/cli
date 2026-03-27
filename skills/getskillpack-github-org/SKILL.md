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
- Создание новых репозиториев и первичное оформление под разработку (см. workflow агента).
- Настройка CI или локального окружения с доступом к org.

## Правила

- **Никогда** не вставлять PAT в комментарии задач, README, git или логи.
- Skill **не хранит** PAT: токен задаётся в **окружении** (shell, GitHub Actions secret, ENV процесса адаптера). Куда именно — [docs/PAPERCLIP_SKILL_INSTALL_RU.md](../../docs/PAPERCLIP_SKILL_INSTALL_RU.md) (*«После установки skill: куда указывать PAT»*).
- Хранить значение как `GETSKILLPACK_ORG_PAT` (или эквивалентный секрет CI). См. [docs/GETSKILLPACK_GITHUB_ORG.md](../../docs/GETSKILLPACK_GITHUB_ORG.md).
- Выдавать минимальные GitHub scopes под конкретный сценарий (таблица в том же документе).

## Действия

1. Прочитать `docs/GETSKILLPACK_GITHUB_ORG.md`.
2. Для **создания репозиториев и оформления** под разработку: `docs/AGENT_GITHUB_REPO_WORKFLOW_RU.md` и `./scripts/gh-org-new-repo.sh`.
3. Для проверки токена: `export GETSKILLPACK_ORG_PAT=...` и `./scripts/gh-org-smoke.sh`.
4. Для CI: завести secret `GETSKILLPACK_ORG_PAT` и запускать workflow **getskillpack org (manual)**.

## Импорт в Paperclip

Полная пошаговая инструкция для board (права, пути, curl, назначение агентам): [docs/PAPERCLIP_SKILL_INSTALL_RU.md](../../docs/PAPERCLIP_SKILL_INSTALL_RU.md).

Кратко: `POST /api/companies/{companyId}/skills/import` с `source` = абсолютный путь к каталогу `skills/getskillpack-github-org` на машине, где работает API; затем `POST /api/agents/{agentId}/skills/sync` с `desiredSkills`.
