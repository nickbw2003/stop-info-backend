import * as dotenv from 'dotenv';
dotenv.config();

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MockNetworksService } from './mocks/networks.service.mock';
import { NetworksModule } from './../src/modules/networks/networks.module';
import { NetworksService } from '../src/modules/networks/networks.service';

describe('Networks', () => {
  let app: INestApplication;
  const networksService = new MockNetworksService();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [NetworksModule],
    })
      .overrideProvider(NetworksService)
      .useValue(networksService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`GET /api/v1/networks returns network information data for valid request`, async () => {
    return request(app.getHttpServer())
      .get('/api/v1/networks')
      .expect(200)
      .expect(await networksService.getNetworks());
  });
});
