import { Injectable } from '@nestjs/common';
import publicTransportService, { Network, Station } from 'public-transport-js';

@Injectable()
export class StationsService {
  async stationsByName(network: Network, name: string): Promise<Station[]> {
    return await publicTransportService.stationsByName(network, name);
  }

  async stationsByLatLng(network: Network, lat: number, lng: number): Promise<Station[]> {
    return await publicTransportService.stationsByLatLng(network, lat, lng);
  }
}
