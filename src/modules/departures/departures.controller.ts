import { Get, Controller, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { DeparturesService } from './departures.service';
import { NetworkResponse } from './../../common/interfaces/NetworkResponse';

@Controller(`${process.env.API_BASE}/departures`)
export class DeparturesController {
  constructor(private readonly departuresService: DeparturesService) {}

  @Get('byOriginStation/:originStationId')
  async findByOriginStation(@Param('originStationId') originStationId: string, @Res() response: NetworkResponse) {
    const originStationIdValue = originStationId.trim();

    if (!originStationIdValue) {
      throw new HttpException(`'originStationId' path param is missing`, HttpStatus.BAD_REQUEST);
    }

    try {
      const departures = await this.departuresService.departuresByOriginStation(
        response.locals.network,
        originStationIdValue,
      );

      return response.status(200).send(departures);
    } catch (err) {
      throw new HttpException('error while fetching departures', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
