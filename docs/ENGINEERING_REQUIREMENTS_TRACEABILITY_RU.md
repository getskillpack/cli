# Трассировка: `ENGINEERING_REQUIREMENTS_SKPKG` ↔ доставка

Страница для команды и board: **где лежит канон инженерных требований** к Skill Manager / getskillpack и как закрытые инкременты по тикетам [XDE-84](/XDE/issues/XDE-84), [XDE-85](/XDE/issues/XDE-85), [XDE-87](/XDE/issues/XDE-87), [XDE-89](/XDE/issues/XDE-89), [XDE-90](/XDE/issues/XDE-90), [XDE-92](/XDE/issues/XDE-92) отражены в репозиториях org **getskillpack**. Родительский документ требований в Paperclip: [XDE-15](/XDE/issues/XDE-15#document-engineering-requirements).

## Где живёт план `ENGINEERING_REQUIREMENTS_SKPKG.md`

| Где | Путь / ссылка |
|-----|----------------|
| **Primary workspace проекта Onboarding** (Paperclip) | `plans/ENGINEERING_REQUIREMENTS_SKPKG.md` — относительно корня workspace проекта (рядом с каталогом `skpkg-cli/`). |
| **Канон смысла** | Тот же файл; обновления — по процессу из самого документа (CTO + board). Краткая выжимка для board при изменении разделов 1–3 — в шапке файла. |

Публичного «raw» URL на этот файл в GitHub может не быть, если копия не запушена в отдельный репозиторий: источником остаётся workspace / документ в [XDE-15](/XDE/issues/XDE-15).

## Если workspace CTO и агента разъехались

1. Свериться с **последней** версией в primary workspace Onboarding или с **issue document** в [XDE-15](/XDE/issues/XDE-15#document-engineering-requirements), если туда вынесли текст.
2. Не править «тихую» копию в личном cwd: либо обновить файл в согласованном месте (workspace / репо), либо зафиксировать расхождение комментарием в релевантном тикете ([XDE-43](/XDE/issues/XDE-43) и др.).

## Таблица: тикет → репозиторий → артефакт

Связь с разделами 2–3 `ENGINEERING_REQUIREMENTS_SKPKG.md` (реестр, менеджер на Go, CLI, контракты, CI).

| Тикет | Репозиторий | Артефакт (контракт, PR, коммит) |
|-------|-------------|----------------------------------|
| [XDE-84](/XDE/issues/XDE-84) | [getskillpack/registry](https://github.com/getskillpack/registry) | **Compiled core** в [`docs/registry-api.md`](https://github.com/getskillpack/registry/blob/main/docs/registry-api.md); исходная поставка — [PR #1](https://github.com/getskillpack/registry/pull/1) (ветка `feature/xde-84-registry-contract`). |
| [XDE-85](/XDE/issues/XDE-85) | [getskillpack/skillget-manager](https://github.com/getskillpack/skillget-manager) | Контракт клиента: [`docs/REGISTRY_CLIENT_CONTRACT.md`](https://github.com/getskillpack/skillget-manager/blob/main/docs/REGISTRY_CLIENT_CONTRACT.md); [PR #1](https://github.com/getskillpack/skillget-manager/pull/1). |
| [XDE-87](/XDE/issues/XDE-87) | [getskillpack/cli](https://github.com/getskillpack/cli) | Выравнивание CLI с контрактом менеджера; [PR #2](https://github.com/getskillpack/cli/pull/2) → `main`, `skillget-manager` **v0.1.4** в `go.mod` / vendor. |
| [XDE-89](/XDE/issues/XDE-89) | [getskillpack/cli](https://github.com/getskillpack/cli) | CI на `main`, [`docs/RELEASE.md`](https://github.com/getskillpack/cli/blob/main/docs/RELEASE.md), [`CHANGELOG.md`](https://github.com/getskillpack/cli/blob/main/CHANGELOG.md); пример фиксации: коммит [`c665522`](https://github.com/getskillpack/cli/commit/c665522). |
| [XDE-90](/XDE/issues/XDE-90) | [getskillpack/registry](https://github.com/getskillpack/registry) | Сверка `API.md` / **Compiled core** с клиентским контрактом; коммиты на `main`, напр. [`77ea41c`](https://github.com/getskillpack/registry/commit/77ea41c), [`1e5f26c`](https://github.com/getskillpack/registry/commit/1e5f26c) (см. тред тикета). |
| [XDE-92](/XDE/issues/XDE-92) | [getskillpack/cli](https://github.com/getskillpack/cli) | Автотесты краевых HTTP-кодов реестра (**401** / **404** / **410**) для клиента по [`REGISTRY_CLIENT_CONTRACT.md`](https://github.com/getskillpack/skillget-manager/blob/main/docs/REGISTRY_CLIENT_CONTRACT.md): [`cmd/skillget/registry_edge_responses_test.go`](https://github.com/getskillpack/cli/blob/main/cmd/skillget/registry_edge_responses_test.go); merge [PR #4](https://github.com/getskillpack/cli/pull/4) → `main`. |

## Связанные документы в этом репозитории

- [AGENT_GITHUB_REPO_WORKFLOW_RU.md](AGENT_GITHUB_REPO_WORKFLOW_RU.md) — как пушить и оформлять PR в org **getskillpack**.
- Архитектурное мемо: [XDE-43](/XDE/issues/XDE-43).
