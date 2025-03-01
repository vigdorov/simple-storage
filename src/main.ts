import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_CONTROLLER } from './consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addSecurity('apiKey', {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .setTitle('Storage API')
    .setDescription('API для работы с хранилищами')
    .setVersion('1.0.0')
    .addTag(APP_CONTROLLER)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
