import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
// import { User } from './users/users.schema';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'signIn' })
  async signIn(signInDto: SignInDto): Promise<string> {
    return this.authService
      .signIn(signInDto.username, signInDto.password)
      .then((result) => result.access_token);
  }

  @MessagePattern({ cmd: 'register' })
  register(createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
