import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @MessagePattern({ cmd: 'register' })
  register(createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
}
