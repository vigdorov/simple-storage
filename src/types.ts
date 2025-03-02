export type User = {
  login: string;
  token: string;
};

export type Storage = {
  data: object;
  storageName: string;
  user: string;
  id: string;
};

export type StorageList = Array<{
  user: string;
  storageName: string;
  id: string;
}>;

export type StorageCreate = {
  data: object;
  storageName: string;
};

export type StorageUpdate = {
  data: object;
  storageName?: string;
};
