import { Injectable } from '@nestjs/common';
import publicTransportService, { Network, Departure } from 'public-transport-js';

@Injectable()
export class DeparturesService {
  async departuresByOriginStation(network: Network, originStationId: string): Promise<Departure[]> {
    return await publicTransportService.departuresByOriginStation(network, originStationId);
  }
}
