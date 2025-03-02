import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Storage, StorageCreate } from './types';

export class AuthRequest {
  @ApiProperty()
  login: string;
}

@Schema()
export class UserDocument extends Document {
  @Prop({
    type: String,
    required: true,
  })
  login: string;

  @Prop({
    type: String,
    required: true,
  })
  token: string;
}

@Schema()
export class StorageDocument extends Document {
  @Prop({
    type: Object,
    required: true,
  })
  data: object;

  @Prop({
    type: String,
    required: true,
  })
  storageName: string;

  @Prop({
    type: String,
    required: true,
  })
  user: string;
}

export const StorageScheme = SchemaFactory.createForClass(StorageDocument);
export const UserScheme = SchemaFactory.createForClass(UserDocument);

export class StorageResponse implements Storage {
  @ApiProperty()
  data: object;

  @ApiProperty()
  user: string;

  @ApiProperty()
  storageName: string;

  @ApiProperty()
  id: string;
}

export class StorageCreateRequest implements StorageCreate {
  @ApiProperty()
  data: object;

  @ApiProperty()
  storageName: string;
}
