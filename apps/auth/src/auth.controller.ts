import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'signIn' })
  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    return this.authService
      .signIn(signInDto.username, signInDto.password)
      .then((result) => result);
  }

  @MessagePattern({ cmd: 'register' })
  register(createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @MessagePattern({ cmd: 'refresh' })
  async refresh(
    token: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.refresh(token);
  }
}
