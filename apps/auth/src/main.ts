import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { HttpExceptionFilter } from '../../../libs/common/src/lib/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    },
  );

  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen();
}

bootstrap();
