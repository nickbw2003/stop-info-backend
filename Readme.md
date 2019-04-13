# stop-info-backend

[Node.js](https://nodejs.org/) service which provides information of public transport stations.

## Routes

The following routes are currently available through the base route `/api/v1/` of the service:

| Route                                             |                                                                                              |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `GET stations/byName/:name`                       | Returns all stations matching the `name` path param                                          |
| `GET stations/byLatLng/:lat/:lng`                 | Returns all stations around the coordinate passed by `lat` and `lng` path params             |
| `GET departures/byOriginStation/:originStationId` | Returns all upcoming departures of a station which is passed by `originStationId` path param |
| `GET networks`                                    | Returns information of all available public transport networks                               |

**Note**: Queries are always made for a single public transport network, which has to be applied to requests for each of these routes (except the `GET networks` route) as HTTP header `x-network`. This header is mandatory and can have the following values:

- `Kvv` (Karlsruher Verkehrsverbund, Germany)
- `Vvs` (Verkehrs- und Tarifverbund Stuttgart, Germany)

## Local setup

To run the service locally ensure you have installed [Node.js](https://nodejs.org/) and install all dependencies by running `npm install`. After that you can decide how to run the service:

- `npm run start:dev`: basic usage without debugging support
- `npm run start:debug`: provides debugging support

## Production setup

Production setup is similar to local setup. Install production dependencies `npm install --production` and run the service by `npm start:prod`.

## E2E Tests

To verify functionality there are several end-to-end tests which can be executed `npm test`.

## License
[MIT](LICENSE)
