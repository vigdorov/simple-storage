import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StorageDocument, UserDocument } from './schemas';
import { Model } from 'mongoose';
import { User, Storage, StorageCreate, StorageUpdate } from './types';
import { v4 } from 'uuid';
import { DB_STORAGES, DB_USERS } from './consts';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(UserDocument.name, DB_USERS)
    private userModel: Model<UserDocument>,
    @InjectModel(StorageDocument.name, DB_STORAGES)
    private storageModel: Model<StorageDocument>,
  ) {}

  async checkRequest(token?: string): Promise<User> {
    const userList = await this.userModel.find().exec();
    const searchUser = userList.find((user) => user.token === token);
    if (searchUser) {
      return {
        login: searchUser.login,
        token: searchUser.token,
      };
    }
    throw new NotAcceptableException(`Доступ запрещен`);
  }

  async authUser(login: string): Promise<string> {
    const userList = await this.userModel.find().exec();
    const searchUser = userList.find((user) => user.login === login);
    if (searchUser) {
      return searchUser.token;
    }
    const Model = this.userModel;
    const userModel = new Model({
      login,
      token: v4(),
    });
    const newUser = await userModel.save();
    return newUser.token;
  }

  async getStorageList(login: string): Promise<Storage[]> {
    const storageList = await this.storageModel.find().exec();
    const preparedList = storageList.map(({ data, _id, user }) => ({
      data,
      id: _id as string,
      user,
    }));

    return preparedList.filter(({ user }) => user === login);
  }

  async getStorageById(login: string, id: string): Promise<Storage> {
    const searchStorage = await this.storageModel.findById(id);
    if (searchStorage && searchStorage.user === login) {
      return {
        data: searchStorage.data,
        id: searchStorage._id as string,
        user: searchStorage.user,
      };
    }
    throw new BadRequestException(`Storage с id - "${id}" не найдена`);
  }

  async addStorage(login: string, storage: StorageCreate): Promise<Storage> {
    const Model = this.storageModel;
    const storageModel = new Model({
      data: storage.data,
      user: login,
    });
    try {
      await storageModel.validate();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(e.message);
    }

    const newStorage = await storageModel.save();
    return {
      data: newStorage.data,
      user: newStorage.user,
      id: newStorage._id as string,
    };
  }

  async updateStorage(
    login: string,
    id: string,
    storage: StorageUpdate,
  ): Promise<Storage> {
    const searchStorage = await this.storageModel.findById(id);

    if (!searchStorage || searchStorage.user !== login) {
      throw new BadRequestException(`Storage с id - "${id}" не найден`);
    }

    await searchStorage.updateOne({
      data: storage.data,
    });

    return {
      data: storage.data,
      user: searchStorage.user,
      id: searchStorage._id as string,
    };
  }

  async deleteStorageById(login: string, id: string): Promise<Storage> {
    const searchStorage = await this.storageModel.findById(id);
    if (!searchStorage || searchStorage.user !== login) {
      throw new BadRequestException(`Storage с id - "${id}" не найден`);
    }
    const Model = this.storageModel;

    await Model.findByIdAndDelete(id);

    return {
      data: searchStorage.data,
      user: searchStorage.user,
      id: searchStorage._id as string,
    };
  }
}
