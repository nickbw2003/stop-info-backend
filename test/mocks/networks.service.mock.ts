import { NetworksService } from './../../src/modules/networks/networks.service';
import { NetworkInfo } from 'public-transport-js';

export class MockNetworksService extends NetworksService {
  async getNetworks(): Promise<NetworkInfo[]> {
    return [];
  }
}
