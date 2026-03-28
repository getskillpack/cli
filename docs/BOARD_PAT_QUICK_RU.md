# Board: куда указать PAT (коротко)

Имя переменной везде одно: **`GETSKILLPACK_ORG_PAT`**. Значение **нигде не вводится в Paperclip UI как поле skill** и **не** пишется в тикеты.

## 1. GitHub Actions (CI в репозитории org)

GitHub → ваш репозиторий → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**  
Имя: `GETSKILLPACK_ORG_PAT` → вставить токен → Save.

Дальше запускаете workflow **getskillpack org (manual)** (или свой), который читает этот secret.

Workflow **Go** в этом репозитории: job **`skillget (vendor)`** собирает с **`-mod=vendor`** и **не требует** секрета (в т.ч. на PR из форков). Job **`skillget (remote modules)`** запускается **только если** `GETSKILLPACK_ORG_PAT` задан, проверяет загрузку модулей с GitHub и что каталог **`vendor/`** совпадает с `go.mod`. См. §5.

## 2. Чтобы агент Paperclip (Cursor) видел токен при работе

Нужно, чтобы переменная была в **окружении процесса, который запускает heartbeat** (сервер Paperclip / воркер / тот шелл, из которого вы стартуете `paperclipai` или связанный раннер).

**Практичные варианты:**

| Как у вас запущен Paperclip | Что сделать |
|-----------------------------|-------------|
| Вручную из терминала | Перед стартом сервера: `export GETSKILLPACK_ORG_PAT='ghp_…'` в **том же** сеансе (или `source` файла с секретом, файл не в git). |
| **systemd** | В unit-файле сервиса: `Environment=GETSKILLPACK_ORG_PAT=…` **или** `EnvironmentFile=/etc/paperclip/github.env` (файл `chmod 600`, вне репозитория). |
| **Docker / compose** | В `compose` секрет или `env_file` для контейнера API/воркера; **не** коммитить `.env` с токеном. |

После изменения перезапустите сервис, чтобы дочерние процессы (в т.ч. вызовы Cursor) унаследовали ENV.

Проверка на машине сервера (без вывода значения):

```bash
[ -n "$GETSKILLPACK_ORG_PAT" ] && echo "переменная задана" || echo "переменная пуста"
```

## 3. Только у себя на ноутбуке (скрипты, не агент)

В терминале: `export GETSKILLPACK_ORG_PAT=…` и запуск `./scripts/gh-org-smoke.sh` или `gh` — на время сессии.

## Не сюда

- не комментарии к [XDE-10](/XDE/issues/XDE-10);
- не `git commit`, не README;
- не «поле в skill» в библиотеке компании.

Подробнее: [PAPERCLIP_SKILL_INSTALL_RU.md](PAPERCLIP_SKILL_INSTALL_RU.md), [GETSKILLPACK_GITHUB_ORG.md](GETSKILLPACK_GITHUB_ORG.md).

## 4. Go modules (`skillget` / `go build` без `replace`)

Пока репозитории org **приватные**, публичный `proxy.golang.org` не отдаёт zip модуля. Нужно:

1. **Обход прокси для org:**  
   `export GOPRIVATE=github.com/getskillpack/*`  
   и отключить checksum DB для этих путей (иначе `sum.golang.org` не найдёт запись):  
   `export GONOSUMDB=github.com/getskillpack/*`

2. **Доступ `git` к GitHub** при `go get` / `go build` (clone по HTTPS): тот же PAT, что и для API — например `~/.netrc`:

   ```
   machine github.com
   login x-access-token
   password ghp_…
   ```

   Права на файл: `chmod 600 ~/.netrc`. Альтернатива — SSH remote и `insteadOf` (см. документацию GitHub).

3. После публикации модуля в **публичный** proxy можно убрать `GOPRIVATE` для `skillget-manager` и пиноваться обычным `go get …@v0.1.0` без локального `replace`.

## 5. Каталог `vendor/` (CI без секрета в репозитории)

В репозитории закоммичен **`vendor/`** для `skillget-manager`, чтобы **GitHub Actions** могли выполнять `go build -mod=vendor` без доступа к приватным модулям по сети.

После смены версии в `go.mod` / `go.sum` (или при добавлении зависимости):

1. Локально: `GOPRIVATE`, `GONOSUMDB` и git-доступ к `github.com` (как в §4).
2. `go mod tidy` при необходимости, затем **`go mod vendor`**.
3. Закоммитить изменения **`go.mod`**, **`go.sum`** и **`vendor/`**.

Без шага 2 job **`skillget (remote modules)`** (когда секрет уже есть) упадёт на проверке `git diff vendor/`.
