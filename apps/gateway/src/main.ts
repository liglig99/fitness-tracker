import { NestFactory } from '@nestjs/core';
import {
  INestApplication,
  INestMicroservice,
  ValidationPipe,
} from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { GatewayModule } from './gateway.module';
import { AllGlobalExceptionsFilter } from '@app/common/utils';

async function bootstrap() {
  const app: INestApplication & INestMicroservice = await NestFactory.create(
    GatewayModule,
    new ExpressAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllGlobalExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
