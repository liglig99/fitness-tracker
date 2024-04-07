import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  User,
  UserSchema,
} from '../../../../libs/common/src/models/users.schema';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@app/common';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
