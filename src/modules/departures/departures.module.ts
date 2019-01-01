import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { NetworkMiddleware } from './../../common/network.middleware';
import { DeparturesController } from './departures.controller';
import { DeparturesService } from './departures.service';

@Module({
  controllers: [DeparturesController],
  providers: [DeparturesService],
})
export class DeparturesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(NetworkMiddleware).forRoutes(DeparturesController);
  }
}
