import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthController } from 'apps/gateway/src/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { CustomClientProxy } from 'libs/common/src/lib/custom-client-proxy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        // customClass: CustomClientProxy,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [GatewayController, AuthController],
  providers: [GatewayService],
})
export class GatewayModule {}
