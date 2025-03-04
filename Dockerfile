# Этап сборки
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап продакшна
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
RUN npm ci --only=production

# Переменные окружения
ENV NODE_ENV production

# Пользователь без привилегий для безопасности
USER node

EXPOSE 3000
CMD ["node", "dist/main"]