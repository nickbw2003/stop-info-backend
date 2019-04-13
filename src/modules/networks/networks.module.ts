import { NestModule, Module } from '@nestjs/common';
import { NetworksController } from './networks.controller';
import { NetworksService } from './networks.service';

@Module({
  controllers: [NetworksController],
  providers: [NetworksService],
})
export class NetworksModule implements NestModule {
  configure(): void {}
}
