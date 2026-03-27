# Как установить skill **getskillpack-github-org** в Paperclip (компания)

Skill лежит в этом репозитории: каталог [`skills/getskillpack-github-org/`](../skills/getskillpack-github-org/) (файл `SKILL.md` внутри).

## Кто может установить

Импорт в **библиотеку компании** и назначение агентам доступны **board**, **CEO-агенту** или агенту с эффективным правом **`agents:create`** (мутации company skills). Обычный IC-агент (например, Founding Engineer) при вызове `POST .../skills/import` получит ошибку вроде `Missing permission: can create agents`.

## Важно про путь к файлам

Импорт с **локальным путём** (`source`: абсолютный путь к папке skill) читает файлы **с той машины, где работает API Paperclip**. Если приложение у вас на сервере, путь должен существовать **на сервере**, а не только на вашем ноутбуке. Если репозиторий синхронизирован в project workspace компании — используйте фактический абсолютный путь к `skills/getskillpack-github-org` на сервере.

Пример (подставьте свой префикс проекта Paperclip):

```text
/home/paperclip/.paperclip/instances/default/projects/<company-uuid>/<project-uuid>/_default/skpkg-cli/skills/getskillpack-github-org
```

## Способ 1 — импорт по локальному пути (API)

1. Убедитесь, что каталог skill на диске доступен процессу Paperclip (см. выше).
2. Вызовите импорт (подставьте `COMPANY_ID`, URL API и **токен авторизации board/CEO** — не JWT рядового агента):

```bash
export PAPERCLIP_API_URL="https://ваш-хост"   # или http://localhost:3100
export PAPERCLIP_COMPANY_ID="<uuid компании>"
export BOARD_TOKEN="<Bearer токен пользователя board / CEO из UI или выданный API>"

curl -sS -X POST "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/skills/import" \
  -H "Authorization: Bearer $BOARD_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"source\": \"/ABS/PATH/TO/skpkg-cli/skills/getskillpack-github-org\"}"
```

3. Проверьте, что skill появился в библиотеке:

```bash
curl -sS "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/skills" \
  -H "Authorization: Bearer $BOARD_TOKEN" | jq .
```

В ответе найдите запись с именем вроде `getskillpack-github-org` и зафиксируйте **канонический ключ** (поле `key` или эквивалент в вашей версии API).

## Способ 2 — сканирование project workspaces

Если в настройках компании/project workspace уже указывает на корень монорепы / `_default`, где лежит `skpkg-cli`, можно попробовать обнаружить skills автоматически:

```bash
curl -sS -X POST "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/skills/scan-projects" \
  -H "Authorization: Bearer $BOARD_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Дальше в UI или через `GET .../skills` завершите установку/обновление, если продукт это предлагает (поведение зависит от версии).

## Назначить skill агенту

1. Узнайте id агента:

```bash
curl -sS "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/agents" \
  -H "Authorization: Bearer $BOARD_TOKEN" | jq .
```

2. Синхронизируйте список желаемых skills (подставьте **точный ключ** из библиотеки компании):

```bash
curl -sS -X POST "$PAPERCLIP_API_URL/api/agents/<AGENT_ID>/skills/sync" \
  -H "Authorization: Bearer $BOARD_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "desiredSkills": [
      "getskillpack-github-org"
    ]
  }'
```

Если ключ неоднозначен, API вернёт `422` — тогда укажите полный канонический ключ из `GET .../skills`.

3. Проверка:

```bash
curl -sS "$PAPERCLIP_API_URL/api/agents/<AGENT_ID>/skills" \
  -H "Authorization: Bearer $BOARD_TOKEN" | jq .
```

## Веб-интерфейс

Если в вашей сборке Paperclip есть раздел **Company → Skills** (или аналог) с кнопкой **Import** / **Install from path**, шаги те же по смыслу: укажите каталог `skills/getskillpack-github-org` на машине сервера или выберите обнаруженный skill после **scan**. Точные подписи кнопок зависят от версии UI.

## После установки

Содержание skill ссылается на [GETSKILLPACK_GITHUB_ORG.md](GETSKILLPACK_GITHUB_ORG.md) (секреты PAT, CI, scopes). Токен PAT по-прежнему **не** хранить в тикетах и в git.

## Связанные тикеты

- [XDE-10](/XDE/issues/XDE-10) — исходная задача по PAT и автоматизации org **getskillpack**.
