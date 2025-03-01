export const MONGO_URL = 'mongodb://localhost:27017';

export const APP_CONTROLLER = 'storage-app';

export const DB_USERS = 'storage-back-users';
export const DB_STORAGES = 'storage-back-storages';

export const ALLOW_ORIGIN_ALL: [string, string] = [
  'Access-Control-Allow-Origin',
  '*',
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
