# Board: куда указать PAT (коротко)

Имя переменной везде одно: **`GETSKILLPACK_ORG_PAT`**. Значение **нигде не вводится в Paperclip UI как поле skill** и **не** пишется в тикеты.

## 1. GitHub Actions (CI в репозитории org)

GitHub → ваш репозиторий → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**  
Имя: `GETSKILLPACK_ORG_PAT` → вставить токен → Save.

Дальше запускаете workflow **getskillpack org (manual)** (или свой), который читает этот secret.

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
