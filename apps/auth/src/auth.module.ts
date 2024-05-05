import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './auth.constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users/users.service';
import { UserSchema } from './users/users.schema';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forRoot(
      'mongodb://admin:secret@mongodb/auth?authSource=admin',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
