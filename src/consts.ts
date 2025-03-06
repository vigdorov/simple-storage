// Подключение к MongoDB
export const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// Имя базы данных для пользователей и хранилищ
export const DB_USERS = process.env.DB_USERS || 'storage-back-users';
export const DB_STORAGES = process.env.DB_STORAGES || 'storage-back-storages';

// Порт приложения
export const APP_PORT = parseInt(process.env.APP_PORT || '3000', 10);

// Другие константы
export const APP_CONTROLLER = 'storage-app';

// CORS настройки
export const ALLOW_ORIGIN_ALL: [string, string] = [
  'Access-Control-Allow-Origin',
  process.env.CORS_ORIGIN || '*',
];
export const ALLOW_CREDENTIALS: [string, string] = [
  'Access-Control-Allow-Credentials',
  'true',
];
export const CONTENT_LENGTH: [string, string] = ['Content-Length', '0'];
export const ALLOW_METHOD: [string, string] = [
  'Access-Control-Allow-Methods',
  'GET,HEAD,PUT,PATCH,POST,DELETE',
];
export const ALLOW_HEADERS: [string, string] = [
  'Access-Control-Allow-Headers',
  'Version, Authorization, Content-Type, Api-Name, x-turbo-id, x-turbo-compression, chrome-proxy, chrome-proxy-ect',
];
