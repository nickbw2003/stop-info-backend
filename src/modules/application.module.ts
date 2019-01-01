import { Module } from '@nestjs/common';
import { StationsModule } from './stations/stations.module';
import { DeparturesModule } from './departures/departures.module';

@Module({
  imports: [StationsModule, DeparturesModule],
})
export class ApplicationModule {}
