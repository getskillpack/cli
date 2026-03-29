# Матрица совместимости: CLI ↔ skillget-manager ↔ registry

Короткая сводка для мейнтейнеров: **какая комбинация версий** считается согласованной с веткой `main` этого репозитория. Подробная трассировка тикетов и артефактов — в [`ENGINEERING_REQUIREMENTS_TRACEABILITY_RU.md`](ENGINEERING_REQUIREMENTS_TRACEABILITY_RU.md) (без дублирования таблицы «тикет → репо»).

## Зафиксированная связка на `main` (getskillpack/cli)

| Компонент | Версия / ревизия | Где смотреть |
|-----------|------------------|--------------|
| **CLI** | ветка `main` | этот репозиторий |
| **skillget-manager** (Go module) | **v0.1.4** | [`go.mod`](../go.mod), [`go.sum`](../go.sum), каталог [`vendor/github.com/getskillpack/skillget-manager`](../vendor/github.com/getskillpack/skillget-manager) |
| **registry** (исходники контракта) | ветка `main` репозитория [getskillpack/registry](https://github.com/getskillpack/registry); ориентир последнего снятия HEAD: коммит [`b415a0e`](https://github.com/getskillpack/registry/commit/b415a0e) (2026-03-29) | канон HTTP: [`docs/registry-api.md`](https://github.com/getskillpack/registry/blob/main/docs/registry-api.md) |
| **Прод по умолчанию** | базовый URL `https://registry.skpkg.org/api/v1` | константа `defaultRegistryBase` в skillget-manager ([`config.go` в vendor](../vendor/github.com/getskillpack/skillget-manager/config.go)) |

При смене тега/версии **skillget-manager** или после осознанного изменения **compiled core** в registry обновляйте эту таблицу и при необходимости строку в traceability-документе.

Исторические якоря сверки контракта registry ↔ клиент (см. [XDE-90](/XDE/issues/XDE-90)): коммиты [`77ea41c`](https://github.com/getskillpack/registry/commit/77ea41c), [`1e5f26c`](https://github.com/getskillpack/registry/commit/1e5f26c) на `main` registry — для регрессионной отсылки, не как «текущий обязательный пин».

## Канон HTTP (обязательные ссылки)

| Роль | Документ |
|------|----------|
| Формы и маршруты API реестра (compiled core) | [`registry-api.md`](https://github.com/getskillpack/registry/blob/main/docs/registry-api.md) в **getskillpack/registry** |
| Ожидания Go-клиента (статусы, env, пути) | [`REGISTRY_CLIENT_CONTRACT.md`](https://github.com/getskillpack/skillget-manager/blob/main/docs/REGISTRY_CLIENT_CONTRACT.md) в **getskillpack/skillget-manager** |

Краткие пользовательские ссылки на те же контракты — в [`QUICKSTART.md`](QUICKSTART.md) и [`RELEASE.md`](RELEASE.md).
