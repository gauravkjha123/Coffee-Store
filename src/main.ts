import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import CustomLogger from './logger/customLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useLogger(app.get(CustomLogger));
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(4000);
}

bootstrap();
