import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
