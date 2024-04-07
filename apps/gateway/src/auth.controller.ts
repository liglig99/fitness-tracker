import { Body, Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { SignInDto } from 'apps/auth/src/dto/sign-in.dto';
import { CreateUserDto } from 'apps/auth/src/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, tap } from 'rxjs';
import { Public } from '@app/common/lib/auth.guard';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authClient.send({ cmd: 'signIn' }, signInDto).pipe(
      tap((tokens) => {
        this.setTokenCookies(res, tokens.access_token, tokens.refresh_token);
        return res.send();
      }),
    );
  }

  @Public()
  @Post('register')
  register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Observable<any> {
    return this.authClient.send({ cmd: 'register' }, createUserDto).pipe(
      tap((result) => {
        this.setTokenCookies(res, result.access_token, result.refresh_token);
        return res.send(result.user);
      }),
    );
  }

  @Public()
  @Post('refresh')
  refresh(@Req() req: Request, @Res() res: Response): Observable<any> {
    return this.authClient
      .send({ cmd: 'refresh' }, req.cookies.refresh_token)
      .pipe(
        tap((tokens) => {
          this.setTokenCookies(res, tokens.access_token, tokens.refresh_token);
          return res.send();
        }),
      );
  }

  setTokenCookies(res: Response, access_token: string, refresh_token: string) {
    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
    });
  }
}
