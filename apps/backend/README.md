# Backend - Interview Platform

Серверное API платформы собеседований. Пакет монорепы: `apps/backend` (`pnpm --filter backend`).

---

## Стек

| Слой | Технологии |
|------|------------|
| Runtime | Node.js ≥ 24, TypeScript |
| Framework | NestJS 11 |
| API | REST (`/api/v1`), Swagger (`/docs`) |
| ORM | Prisma 7 (`prisma-client-js`, multi-file schema) |
| БД | PostgreSQL 17 |
| Кэш / брокер | Redis 8 (`ioredis`) |
| Валидация | `class-validator`, `class-transformer` |
| Конфиг | `@nestjs/config` + `.env` |
| Пакетный менеджер | pnpm (workspace) |
| Локальная инфра | Docker Compose (`docker/compose.yaml`) |

---

## Структура

```
apps/backend/
├── prisma/                 # multi-file схема
│   ├── base.prisma         # generator + datasource
│   ├── enums.prisma
│   ├── user.prisma
│   └── migrations/
├── generated/prisma/       # Prisma Client (генерируется, в git не коммитится)
├── prisma.config.ts        # URL БД для CLI (Prisma 7)
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/             # configuration + env validation
│   ├── common/             # общие файлы backend пакета.
│   ├── database/           # PrismaModule / PrismaService (adapter-pg)
│   ├── redis/              # RedisModule
│   └── modules/
│       ├── health/
│       └── users/
└── package.json
```

Общие типы API — `packages/shared` (`@ip/shared`).

---

## Запуск с нуля (локальная разработка)

Backend работает на хосте, Postgres / Redis / pgAdmin - в Docker.

### 1. Переменные окружения

Из **корня** монорепы:

```bash
cp docker/.env.example docker/.env
cp apps/backend/.env.example apps/backend/.env
```

`apps/backend/.env` должен указывать на Docker-порты:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/itzoom?schema=public
REDIS_URL=redis://localhost:6379
PORT=3000
```

### 2. Зависимости и инфра

```bash
pnpm install
pnpm docker:up:infra
```

Поднятся: `postgres` (:5432), `redis` (:6379), `pgadmin` (:5050).

Проверка: `pnpm docker:ps`.

### 3. Prisma и API

```bash
pnpm --filter backend prisma:generate
pnpm --filter backend prisma:migrate
pnpm dev:backend
```

Или из `apps/backend`:

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm dev
```

### 4. Проверка

| URL | Описание |
|-----|----------|
| http://localhost:3000/api/v1/health | Health (Postgres + Redis) |
| http://localhost:3000/api/v1/users | Список пользователей |
| http://localhost:3000/docs | Swagger |
| http://localhost:5050 | pgAdmin (веб) |

#### pgAdmin: два разных входа

Веб-версия (`http://localhost:5050`) сначала спрашивает **логин самого pgAdmin**, не Postgres.

| Куда | Email / Username | Password |
|------|------------------|----------|
| **Форма Login на сайте** (вход в pgAdmin) | `admin@example.com` | `admin` |
| **Подключение к серверу PostgreSQL** (после входа) | `postgres` | `postgres` |

- Email обязан содержать `@` — логин `postgres` на странице `/login` не подойдёт (в логах: `An email address must have an @-sign`).
- Desktop-приложение pgAdmin форму сайта не показывает: сразу Add Server с `localhost:5432` / `itzoom` / `postgres`.
- В Docker web-pgAdmin хост БД — `postgres` (имя сервиса), не `localhost`. Сервер уже прописан в `docker/pgadmin/servers.json`.

Параметры берутся из `docker/.env` (`PGADMIN_DEFAULT_*`, `POSTGRES_*`).

---

## Запуск «начисто» (сброс БД)

Остановить backend (`Ctrl+C`), затем:

```bash
pnpm docker:clean          # down + удаление volumes
pnpm docker:up:infra
pnpm --filter backend prisma:generate
pnpm --filter backend prisma:migrate
pnpm dev:backend
```

`docker:clean` стирает данные Postgres / Redis / pgAdmin.

---

## Полезные команды

| Команда | Описание |
|---------|----------|
| `pnpm dev:backend` | Nest в watch-режиме |
| `pnpm --filter backend build` | `prisma generate` + `nest build` |
| `pnpm --filter backend prisma:studio` | GUI Prisma |
| `pnpm docker:up:infra` | только инфра |
| `pnpm docker:down` | остановить контейнеры (данные остаются) |
| `pnpm docker:logs` | логи compose |
| `pnpm docker:ps` | статус контейнеров |

---

## Docker (backend в контейнере)

Инфраструктура и опционально API — `docker/compose.yaml`, образ — `docker/backend/Dockerfile`.

```bash
cp docker/.env.example docker/.env
pnpm docker:up:infra
pnpm docker:build:backend
pnpm docker:up:backend
```

---

## Замечания

- Префикс API: `/api/v1` (см. `GLOBAL_PREFIX` / `API_VERSION` в `.env`).
- Prisma 7: connection URL для CLI — в `prisma.config.ts`; в runtime — через `@prisma/adapter-pg` в `PrismaService`.
- Схемы не класть сгенерированный клиент внутрь `prisma/` — только в `generated/prisma/`, иначе multi-file schema подхватит лишние `.prisma` файлы.
