import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupAsyncApiDocs } from './common/docs/asyncapi-docs.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port', 3000);

  app.setGlobalPrefix(`${process.env.GLOBAL_PREFIX?? 'api'}/${process.env.API_VER?? 'v1'}`);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Interview Platform API')
    .setDescription('Backend API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Документация WebSocket-событий (Socket.IO) — вручную написанная AsyncAPI-
  // спека в asyncapi/asyncapi.yaml, отдаётся как есть + рендерится в HTML.
  // См. комментарий в asyncapi/asyncapi.yaml, почему не decorator-based генератор.
  setupAsyncApiDocs(app, {
    path: 'ws-docs',
    specFilePath: join(process.cwd(), 'asyncapi', 'asyncapi.yaml'),
    title: 'Interview Platform — WebSocket API',
  });

  await app.listen(port);
}

bootstrap();
