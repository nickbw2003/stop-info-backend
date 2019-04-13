import { Get, Controller, HttpException, HttpStatus } from '@nestjs/common';
import { NetworksService } from './networks.service';

@Controller(`${process.env.API_BASE}/networks`)
export class NetworksController {
  constructor(private readonly networksService: NetworksService) {}

  @Get('/')
  async networks() {
    try {
      return await this.networksService.getNetworks();
    } catch (err) {
      throw new HttpException('error while fetching network information', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
