import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port', 3000);

  app.setGlobalPrefix(`${process.env.GLOBAL_PREFIX?? 'api'}/${process.env.API_VER?? 'v1'}`);
  app.useGlobalPipes(
    new ValidationPipe(),
  );
  // app.us
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Interview Platform API')
    .setDescription('Backend API')
    .setVersion('1.0')
    .addBearerAuth()           // used in Swagger UI to test protected endpoints
    .addCookieAuth('access_token')  // documentation only — HttpOnly, not settable via Swagger
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}

bootstrap();
