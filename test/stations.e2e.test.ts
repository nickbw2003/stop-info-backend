import * as dotenv from 'dotenv';
dotenv.config();

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StationsModule } from './../src/modules/stations/stations.module';
import { StationsService } from './../src/modules/stations/stations.service';
import { MockStationsService } from './mocks/stations.service.mock';
import { Network } from 'public-transport-js';
import { INestApplication } from '@nestjs/common';

describe('Stations', () => {
  let app: INestApplication;
  const stationsService = new MockStationsService();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [StationsModule],
    })
      .overrideProvider(StationsService)
      .useValue(stationsService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`GET /api/v1/stations/byName returns station data for valid request`, async () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byName/Karlsruhe%20Hbf')
      .set('x-network', 'Kvv')
      .expect(200)
      .expect(await stationsService.stationsByName(Network.Kvv, 'Karlsruhe Hbf'));
  });

  it(`GET /api/v1/stations/byName returns 400 Bad Request if no 'x-network' header is set`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byName/Karlsruhe%20Hbf')
      .expect(400);
  });

  it(`GET /api/v1/stations/byName returns 400 Bad Request if no 'x-network' header has invalid value`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byName/Karlsruhe%20Hbf')
      .set('x-network', 'Foo')
      .expect(400);
  });

  it(`GET /api/v1/stations/byName returns 400 Bad Request if 'name' path param has whitespace value`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byName/%20')
      .set('x-network', 'Kvv')
      .expect(400);
  });

  it(`GET /api/v1/stations/byLatLng returns station data for valid request`, async () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byLatLng/48993349/8401035')
      .set('x-network', 'Kvv')
      .expect(200)
      .expect(await stationsService.stationsByLatLng(Network.Kvv, 48.99334939018, 8.401035553929999));
  });

  it(`GET /api/v1/stations/byLatLng returns 400 Bad Request if no 'x-network' header is set`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byLatLng/48993349/8401035')
      .expect(400);
  });

  it(`GET /api/v1/stations/byLatLng returns 400 Bad Request if no 'x-network' header has invalid value`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byLatLng/48993349/8401035')
      .set('x-network', 'Foo')
      .expect(400);
  });

  it(`GET /api/v1/stations/byLatLng returns 400 Bad Request if 'lat' path param has whitespace value`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byLatLng/%20/8401035')
      .set('x-network', 'Kvv')
      .expect(400);
  });

  it(`GET /api/v1/stations/byLatLng returns 400 Bad Request if 'lat' is NaN`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byLatLng/foo/8401035')
      .set('x-network', 'Kvv')
      .expect(400);
  });

  it(`GET /api/v1/stations/byLatLng returns 400 Bad Request if 'lng' path param has whitespace value`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byLatLng/48993349/%20')
      .set('x-network', 'Kvv')
      .expect(400);
  });

  it(`GET /api/v1/stations/byLatLng returns 400 Bad Request if 'lng' path param is NaN`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/stations/byLatLng/48993349/bar')
      .set('x-network', 'Kvv')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
