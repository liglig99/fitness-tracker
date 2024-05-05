import { NestFactory } from '@nestjs/core';
import {
  INestApplication,
  INestMicroservice,
  ValidationPipe,
} from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { GatewayModule } from './gateway.module';
import { AllGlobalExceptionsFilter } from './global-exception-filter';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app: INestApplication & INestMicroservice = await NestFactory.create(
    GatewayModule,
    new ExpressAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllGlobalExceptionsFilter());
  app.use(cookieParser());
  app.useLogger(app.get('Logger'));
  await app.listen(3000);
}
bootstrap();
