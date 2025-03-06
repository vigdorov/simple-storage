import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_CONTROLLER, APP_PORT } from './consts';

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

  console.log(`Application is starting on port ${APP_PORT}`);
  await app.listen(APP_PORT);
}

void bootstrap();
