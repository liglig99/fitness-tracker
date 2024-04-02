import { NestFactory } from '@nestjs/core';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app: INestApplication & INestMicroservice = await NestFactory.create(
    GatewayModule,
    new ExpressAdapter(),
  );

  app.connectMicroservice({
    transport: 'tcp',
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
