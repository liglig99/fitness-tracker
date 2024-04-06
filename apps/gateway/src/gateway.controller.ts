import { Controller, Get, Headers } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  async getHello(@Headers('authorization') token: string): Promise<string> {
    return this.gatewayService.getHello(token);
  }
}
