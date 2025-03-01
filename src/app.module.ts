import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_STORAGES, DB_USERS, MONGO_URL } from './consts';
import {
  StorageDocument,
  StorageScheme,
  UserDocument,
  UserScheme,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forRoot(`${MONGO_URL}/${DB_USERS}`, {
      connectionName: DB_USERS,
    }),
    MongooseModule.forRoot(`${MONGO_URL}/${DB_STORAGES}`, {
      connectionName: DB_STORAGES,
    }),
    MongooseModule.forFeature(
      [{ name: UserDocument.name, schema: UserScheme }],
      DB_USERS,
    ),
    MongooseModule.forFeature(
      [{ name: StorageDocument.name, schema: StorageScheme }],
      DB_STORAGES,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
