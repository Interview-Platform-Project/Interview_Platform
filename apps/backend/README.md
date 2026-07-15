# Backend

NestJS API.

## Локальная разработка

```bash
cp docker/.env.example docker/.env
cp apps/backend/.env.example apps/backend/.env
pnpm install
pnpm docker:up:infra
pnpm --filter backend prisma:generate
pnpm --filter backend prisma:migrate
pnpm dev:backend
```

| URL | Описание |
|-----|----------|
| http://localhost:3000/api/v1/health | Health check |
| http://localhost:3000/api/v1/users | Users |
| http://localhost:3000/docs | Swagger |

## Docker

Инфраструктура и backend — `docker/compose.yaml`.

```bash
cp docker/.env.example docker/.env
pnpm docker:up:infra
pnpm docker:build:backend
pnpm docker:up:backend
```

Backend в контейнере: http://localhost:3000

Сборка образа:

```bash
pnpm docker:build:backend
```

Dockerfile: `docker/backend/Dockerfile`
