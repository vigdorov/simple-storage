import {
  Controller,
  Get,
  Header,
  HttpCode,
  Options,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { ApiBody, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  ALLOW_CREDENTIALS,
  ALLOW_HEADERS,
  ALLOW_METHOD,
  ALLOW_ORIGIN_ALL,
  CONTENT_LENGTH,
} from './consts';
import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  GET_STORAGES_LIST_SUCCESS,
} from './api.responses';
import { AuthRequest } from './schemas';
import { Storage } from './types';

@Controller()
@ApiTags('storage-app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth')
  @ApiBody({
    type: AuthRequest,
    description: 'Объект с логином пользователя',
  })
  @Header(...ALLOW_ORIGIN_ALL)
  @ApiResponse(AUTH_SUCCESS)
  authUser(
    @Req() request: Request<null, null, { login: string }>,
  ): Promise<string> {
    return this.appService.authUser(request.body.login);
  }

  @Get('/storages')
  @ApiSecurity('apiKey')
  @Header(...ALLOW_ORIGIN_ALL)
  @ApiResponse(GET_STORAGES_LIST_SUCCESS)
  @ApiResponse(AUTH_ERROR)
  async getStorageList(@Req() request: Request): Promise<Storage[]> {
    const { login } = await this.appService.checkRequest(
      request.headers.authorization,
    );
    return this.appService.getStorageList(login);
  }

  @Options(['', '/auth'])
  @Header(...ALLOW_ORIGIN_ALL)
  @Header(...ALLOW_METHOD)
  @Header(...ALLOW_CREDENTIALS)
  @Header(...CONTENT_LENGTH)
  @Header(...ALLOW_HEADERS)
  @HttpCode(204)
  async options(): Promise<string> {
    return await Promise.resolve('');
  }
}
