import { Module } from '@nestjs/common';
import { StationsModule } from './stations/stations.module';
import { DeparturesModule } from './departures/departures.module';
import { NetworksModule } from './networks/networks.module';

@Module({
  imports: [StationsModule, DeparturesModule, NetworksModule],
})
export class ApplicationModule {}
