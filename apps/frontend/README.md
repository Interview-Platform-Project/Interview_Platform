# 🚀 Frontend — Интервью-платформа
Клиентское приложение для платформы проведения собеседований. Построено на **Next.js 16** с использованием **React 19** и методологии **Feature-Sliced Design (FSD)**.

---

## 📦 Технологический стек

- Next.js
- React
- TypeScript
- Sass
- ESLint
- pnpm
- shadcn (BaseUI, Lucide icons)

---

## 📁 Структура проекта (FSD)

Проект организован по методологии **Feature-Sliced Design**, адаптированной для Next.js.
Подробнее: [FSD для Next.js](https://fsd.how/ru/docs/guides/tech/with-nextjs/)

```bash
apps/frontend/
├── app/                          # Next.js App Router (роутинг)
│   └── (pages)/                  # Страницы и макеты
│
├── pages/                        # Композиции страниц (для использования в App Router)
│
├── src/
│   ├── app/                      # Слайсы приложения (FSD)
│   │   ├── config/               # Конфигурация приложения
│   │   ├── providers/            # Провайдеры (Theme, Query, etc.)
│   │   └── styles/               # Глобальные стили
│   │
│   ├── entities/                 # Сущности (пользователь, вакансия, etc.)
│   │
│   ├── features/                 # Функциональные возможности (авторизация, поиск)
│   │
│   ├── shared/                   # Общий код *для фронтенда* (не путать с packages/shared!)
│   │
│   └── widgets/                  # Виджеты (комплексные блоки)
│
├── public/                       # Статические файлы
│
├── .env.default                  # Пример переменных окружения
├── next.config.ts                # Конфигурация Next.js
├── package.json                  # Зависимости и скрипты
└── README.md                     # Этот файл
