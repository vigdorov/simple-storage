import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Options,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
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
  MANIPULATE_STORAGE_SUCCESS,
  GET_STORAGES_LIST_SUCCESS,
} from './api.responses';
import { AuthRequest, StorageCreateRequest } from './schemas';
import { Storage, StorageCreate, StorageList, StorageUpdate } from './types';

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
  async getStorageList(@Req() request: Request): Promise<StorageList> {
    const { login } = await this.appService.checkRequest(
      request.headers.authorization,
    );
    return this.appService.getStorageList(login);
  }

  @Get('/storages/:id')
  @ApiSecurity('apiKey')
  @ApiParam({
    name: 'id',
    description: 'id storage',
  })
  @Header(...ALLOW_ORIGIN_ALL)
  @ApiResponse(MANIPULATE_STORAGE_SUCCESS)
  @ApiResponse(AUTH_ERROR)
  async getImageById(
    @Req() request: Request<{ id: string }>,
  ): Promise<Storage> {
    const { login } = await this.appService.checkRequest(
      request.headers.authorization,
    );
    return this.appService.getStorageById(login, request.params.id);
  }

  @Post('/storages')
  @ApiSecurity('apiKey')
  @ApiBody({
    type: StorageCreateRequest,
    description: 'Объект создания storage',
  })
  @Header(...ALLOW_ORIGIN_ALL)
  @ApiResponse(MANIPULATE_STORAGE_SUCCESS)
  @ApiResponse(AUTH_ERROR)
  async createImage(
    @Req() request: Request<null, null, StorageCreate>,
  ): Promise<Storage> {
    const { login } = await this.appService.checkRequest(
      request.headers.authorization,
    );
    return this.appService.addStorage(login, request.body);
  }

  @Put('/storages/:id')
  @ApiSecurity('apiKey')
  @ApiParam({
    name: 'id',
    description: 'id storage',
  })
  @Header(...ALLOW_ORIGIN_ALL)
  @ApiResponse(MANIPULATE_STORAGE_SUCCESS)
  @ApiResponse(AUTH_ERROR)
  async toggleLike(
    @Req() request: Request<{ id: string }, null, StorageUpdate>,
  ): Promise<Storage> {
    const { login } = await this.appService.checkRequest(
      request.headers.authorization,
    );
    return this.appService.updateStorage(
      login,
      request.params.id,
      request.body,
    );
  }

  @Delete('/storages/:id')
  @ApiSecurity('apiKey')
  @ApiParam({
    name: 'id',
    description: 'id картинки',
  })
  @Header(...ALLOW_ORIGIN_ALL)
  @ApiResponse(MANIPULATE_STORAGE_SUCCESS)
  @ApiResponse(AUTH_ERROR)
  async deleteImage(@Req() request: Request<{ id: string }>): Promise<Storage> {
    const { login } = await this.appService.checkRequest(
      request.headers.authorization,
    );
    return this.appService.deleteStorageById(login, request.params.id);
  }

  @ApiExcludeEndpoint()
  @Options(['', '/auth', '/storages', '/storages/:id'])
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
