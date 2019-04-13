import { Injectable } from '@nestjs/common';
import publicTransportService, { Network, NetworkInfo } from 'public-transport-js';

@Injectable()
export class NetworksService {
  async getNetworks(): Promise<NetworkInfo[]> {
    const networks: Network[] = Object.keys(Network)
      .filter((key: any) => isNaN(key))
      .map(key => Network[key]);

    const networkInfos: NetworkInfo[] = [];

    for (const network of networks) {
      networkInfos.push(await publicTransportService.networkInfo(network));
    }

    return networkInfos;
  }
}
