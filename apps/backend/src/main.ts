import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import type { AppConfig } from './config/configuration';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { Tokens } from './modules/auth/enums/tokens';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);
  const appConfig = configService.getOrThrow('app', { infer: true });

  app.enableCors({
    origin: appConfig.corsOrigin,
    credentials: true,
  });

  app.setGlobalPrefix(`${appConfig.globalPrefix}/${appConfig.apiVersion}`);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Interview Platform API')
    .setDescription('Backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth(Tokens.ACCESS)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(appConfig.port);
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
