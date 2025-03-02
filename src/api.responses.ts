import { ApiResponseOptions } from '@nestjs/swagger';
import { StorageResponse } from './schemas';

export const AUTH_SUCCESS: ApiResponseOptions = {
  status: 200,
  description: 'Токен пользователя',
  type: String,
};

export const AUTH_ERROR: ApiResponseOptions = {
  status: 406,
  description:
    'Ошибка, при попытке получить доступ к данным без токена или с не корректным токеном',
  type: Error,
};

export const GET_STORAGES_LIST_SUCCESS: ApiResponseOptions = {
  status: 200,
  description: 'Список всех storage пользователя',
  type: StorageResponse,
  isArray: true,
};

export const MANIPULATE_STORAGE_SUCCESS: ApiResponseOptions = {
  status: 200,
  description: 'Storage',
  type: StorageResponse,
};
