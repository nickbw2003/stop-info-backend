import { Get, Controller, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { StationsService } from './stations.service';
import { NetworkResponse } from './../../common/interfaces/NetworkResponse';

@Controller(`${process.env.API_BASE}/stations`)
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get('byName/:name')
  async findByName(@Param('name') name: string, @Res() response: NetworkResponse) {
    const nameValue = name.trim();

    if (!nameValue) {
      throw new HttpException(`'name' path param is missing or has invalid value`, HttpStatus.BAD_REQUEST);
    }

    try {
      const stations = await this.stationsService.stationsByName(response.locals.network, nameValue);
      return response.status(200).send(stations);
    } catch (err) {
      throw new HttpException('error while fetching stations by name', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('byLatLng/:lat/:lng')
  async stationsByLatLng(@Param('lat') lat: string, @Param('lng') lng: string, @Res() response: NetworkResponse) {
    const latValue = parseInt(lat, 10);
    const lngValue = parseInt(lng, 10);

    if (Number.isNaN(latValue)) {
      throw new HttpException(`'lat' path param is missing or has invalid value`, HttpStatus.BAD_REQUEST);
    }

    if (Number.isNaN(lngValue)) {
      throw new HttpException(`'lng' path param is missing or has invalid value`, HttpStatus.BAD_REQUEST);
    }

    try {
      const stations = await this.stationsService.stationsByLatLng(
        response.locals.network,
        latValue / 1e6,
        lngValue / 1e6,
      );

      return response.status(200).send(stations);
    } catch (err) {
      throw new HttpException('error while fetching stations by coordinate', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
