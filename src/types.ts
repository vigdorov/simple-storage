export type User = {
  login: string;
  token: string;
};

export type Storage = {
  data: object;
  user: string;
  id: string;
};

export type StorageCreate = {
  data: object;
};

export type StorageUpdate = {
  data: object;
};
