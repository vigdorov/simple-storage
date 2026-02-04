# Simple Storage

Учебный backend-проект для обучения студентов основам NestJS.

## Назначение

Простой REST API сервис для хранения данных. Используется как демонстрационный проект в рамках обучения backend-разработке.

## Стек

- **Framework:** NestJS
- **Language:** TypeScript
- **Runtime:** Node.js

## Структура

```
src/
├── main.ts              # Точка входа
├── app.module.ts        # Корневой модуль
├── app.controller.ts    # REST контроллер
├── app.service.ts       # Бизнес-логика
├── schemas.ts           # Валидация данных
├── types.ts             # TypeScript типы
├── consts.ts            # Константы
└── api.responses.ts     # Форматы ответов API
```

## Команды

```bash
npm install          # Установка зависимостей
npm run start:dev    # Запуск в dev режиме
npm run build        # Сборка
npm run start:prod   # Production запуск
```

## Деплой

- **Dockerfile:** есть
- **Namespace:** backend-for-learning
- **URL:** https://simple-storage.vigdorov.ru
