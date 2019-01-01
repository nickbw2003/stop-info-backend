import { Injectable, NestMiddleware, MiddlewareFunction, HttpException, HttpStatus } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { Network } from 'public-transport-js';
import { NetworkResponse } from './interfaces/NetworkResponse';

@Injectable()
export class NetworkMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req: Request, res: NetworkResponse, next: NextFunction) => {
      const networkHeader = req.get('x-network');

      if (!networkHeader || !(networkHeader in Network)) {
        throw new HttpException(`'x-network' header is missing or has invalid value`, HttpStatus.BAD_REQUEST);
      }

      res.locals.network = Network[networkHeader];
      next();
    };
  }
}
