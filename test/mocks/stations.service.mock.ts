import { StationsService } from './../../src/modules/stations/stations.service';
import { Network, Station } from 'public-transport-js';

export class MockStationsService extends StationsService {
  async stationsByName(network: Network, name: string): Promise<Station[]> {
    return [
      {
        id: '7000090',
        lat: 48.99334939018,
        lng: 8.401035553929999,
        locality: 'Karlsruhe',
        name: 'Hauptbahnhof',
        distance: null,
      },
      {
        id: '7000088',
        lat: 48.99171075744,
        lng: 8.40097267186,
        locality: 'Karlsruhe',
        name: 'Hauptbahnhof Süd',
        distance: null,
      },
      {
        id: '7000089',
        lat: 48.99436908766,
        lng: 8.399670114700001,
        locality: 'Karlsruhe',
        name: 'Hauptbahnhof Vorplatz',
        distance: null,
      },
    ];
  }

  async stationsByLatLng(network: Network, lat: number, lng: number): Promise<Station[]> {
    return [
      {
        id: '7000090',
        distance: '0',
        lat: 48.99334939018,
        lng: 8.401035553929999,
        locality: 'Karlsruhe',
        name: 'Hauptbahnhof',
      },
      {
        id: '7000089',
        distance: '230',
        lat: 48.99436908766,
        lng: 8.399670114700001,
        locality: 'Karlsruhe',
        name: 'Hbf Vorplatz',
      },
      {
        id: '7000088',
        distance: '278',
        lat: 48.99171075744,
        lng: 8.40097267186,
        locality: 'Karlsruhe',
        name: 'Hauptbahnhof Süd',
      },
    ];
  }
}
