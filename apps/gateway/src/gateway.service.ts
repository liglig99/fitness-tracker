import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException();
    }
  }

  async getHello(token: string): Promise<string> {
    await this.validateToken(token).catch((error) => {
      throw error;
    });
    return 'Hello World!';
  }
}
