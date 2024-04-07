import { Body, Controller, Inject, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { SignInDto } from 'apps/auth/src/dto/sign-in.dto';
import { CreateUserDto } from 'apps/auth/src/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Public } from '@app/common/lib/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() signInDto: SignInDto): Promise<any> {
    return this.authClient.send({ cmd: 'signIn' }, signInDto);
  }

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Observable<any> {
    return this.authClient.send({ cmd: 'register' }, createUserDto);
  }
}
