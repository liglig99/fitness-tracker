import { NestFactory } from '@nestjs/core';
import { WorkoutsModule } from './workouts.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkoutsModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      },
    },
  );

  await app.listen();
}

bootstrap();
