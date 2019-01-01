import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { NetworkMiddleware } from './../../common/network.middleware';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';

@Module({
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(NetworkMiddleware).forRoutes(StationsController);
  }
}
