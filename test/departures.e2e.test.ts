import * as dotenv from 'dotenv';
dotenv.config();

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { DeparturesModule } from './../src/modules/departures/departures.module';
import { DeparturesService } from './../src/modules/departures/departures.service';
import { MockDeparturesService } from './mocks/departures.service.mock';
import { Network } from 'public-transport-js';
import { INestApplication } from '@nestjs/common';

describe('Departures', () => {
  let app: INestApplication;
  const departuresService = new MockDeparturesService();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DeparturesModule],
    })
      .overrideProvider(DeparturesService)
      .useValue(departuresService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`GET /api/v1/departures/byOriginStation returns departure data for valid request`, async () => {
    return request(app.getHttpServer())
      .get('/api/v1/departures/byOriginStation/7000090')
      .set('x-network', 'Kvv')
      .expect(200)
      .expect(await departuresService.departuresByOriginStation(Network.Kvv, '7000090'));
  });

  it(`GET /api/v1/departures/byOriginStation returns 400 Bad Request if no 'x-network' header is set`, async () => {
    return request(app.getHttpServer())
      .get('/api/v1/departures/byOriginStation/7000090')
      .expect(400);
  });

  it(`GET /api/v1/departures/byOriginStation returns 400 Bad Request if 'x-network' header has invalid value`, async () => {
    return request(app.getHttpServer())
      .get('/api/v1/departures/byOriginStation/7000090')
      .set('x-network', 'Foo')
      .expect(400);
  });

  it(`GET /api/v1/departures/byOriginStation returns 400 Bad Request if 'originStationId' path param has whitespace value`, async () => {
    return request(app.getHttpServer())
      .get('/api/v1/departures/byOriginStation/%20')
      .set('x-network', 'Kvv')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
