import { Controller, Get, Request } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.gatewayService.getHello();
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
