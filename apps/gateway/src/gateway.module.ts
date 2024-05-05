import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthController } from 'apps/gateway/src/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'apps/auth/src/auth.constants';
import { APP_GUARD } from '@nestjs/core';
import { WorkoutsController } from './workouts.controller';
import { AuthGuard } from '@app/common';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
      {
        name: 'WORKOUTS_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [GatewayController, AuthController, WorkoutsController],
  providers: [
    GatewayService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class GatewayModule {}
