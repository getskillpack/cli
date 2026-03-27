# Как агенту (Founding Engineer) работать с GitHub org **getskillpack**

Цель: **создавать и оформлять репозитории** под разработку, не раскрывая PAT в тикетах, git и логах.

## Предпосылки

1. В процессе heartbeat/раннера задана переменная **`GETSKILLPACK_ORG_PAT`** (заводит оператор/board; см. [PAPERCLIP_SKILL_INSTALL_RU.md](PAPERCLIP_SKILL_INSTALL_RU.md)).
2. У токена достаточный scope для нужного действия (минимум — см. [GETSKILLPACK_GITHUB_ORG.md](GETSKILLPACK_GITHUB_ORG.md); для **создания репозитория** обычно нужны права на repos org: classic `repo` / `write:org` или эквивалент fine-grained).
3. Имена репозиториев согласовать с board в тикете (**без** вставки токена): например `registry`, `cli`, `docs`.

## Модель работы агента

| Шаг | Действие |
|-----|----------|
| 1 | Прочитать задачу в Paperclip: какой репо, публичный/приватный, описание. |
| 2 | Убедиться, что `GETSKILLPACK_ORG_PAT` доступен в **окружении** текущего шага (не копировать в файлы). |
| 3 | Создать репозиторий скриптом или через `gh` (ниже). |
| 4 | Локально: `git init` / копирование каркаса, коммит, **push** через SSH-remote **или** `gh` с `GH_TOKEN` в сессии — **не** вшивать токен в URL в коммитах и скриптах репо. |
| 5 | Оформление: `README`, лицензия по политике, `.gitignore`, при необходимости шаблон [`.github/workflows/getskillpack-org-manual.yml`](../.github/workflows/getskillpack-org-manual.yml) / свой CI; branch protection — через UI org или API, если выдан scope. |
| 6 | В комментарии к задаче указать **ссылку на репозиторий** и что сделано; статус PAT — только «использовалось окружение», без значения. |

## Создание репозитория (скрипт)

Из корня `skpkg-cli`:

```bash
export GETSKILLPACK_ORG_PAT='...'   # только в текущей сессии / у оператора
./scripts/gh-org-new-repo.sh <имя-репо> private   # или: public
```

Скрипт вызывает GitHub API `POST /orgs/getskillpack/repos` и печатает URL и подсказки для `git remote`.

## Создание репозитория (GitHub CLI)

Если установлен `gh`:

```bash
export GH_TOKEN="$GETSKILLPACK_ORG_PAT"
gh repo create "getskillpack/<имя>" --private --confirm   # или --public
```

Не логировать значение `GH_TOKEN`.

## Push кода

Предпочтительно **SSH** (если у среды есть ключ с доступом к org):

```bash
git remote add origin git@github.com:getskillpack/<имя>.git
git push -u origin main
```

Если только HTTPS и PAT: используйте кратковременно `gh auth login` с `GH_TOKEN` или credential helper; **не** добавляйте в репозиторий команды вида `https://...token@github.com/...`.

## Что агент делегирует человеку

- Политики org (обязательный 2FA, правила для веток по умолчанию на уровне org).
- Сложные **Projects / dashboards**, если scope токена не покрывает или UI быстрее.
- Выдача и ротация PAT (board / security).

## Связанные тикеты

- [XDE-10](/XDE/issues/XDE-10) — секреты PAT, skill, CI.
- [XDE-3](/XDE/issues/XDE-3) — организация **getskillpack**.
