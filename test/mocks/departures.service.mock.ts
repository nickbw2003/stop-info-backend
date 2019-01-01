import { DeparturesService } from './../../src/modules/departures/departures.service';
import { Network, Departure } from 'public-transport-js';

export class MockDeparturesService extends DeparturesService {
  async departuresByOriginStation(network: Network, originStationId: string): Promise<Departure[]> {
    return [
      {
        line: {
          direction: 'Interlaken Ost',
          directionFrom: 'Hamburg-Harburg',
          symbol: 'EC 7 EuroCity',
          routeDetails: null,
        },
        plannedTime: null,
        realTime: null,
      },
      {
        line: {
          direction: 'S32 Menzingen',
          directionFrom: 'Karlsruhe Hbf',
          symbol: 'S32',
          routeDetails: 'Karlsruhe - Weingarten - Untergrombach - Bruchsal - Ubstadt - Münzesheim - Menzingen',
        },
        plannedTime: null,
        realTime: null,
      },
    ];
  }
}
