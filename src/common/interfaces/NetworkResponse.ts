import { Response } from 'express';
import { Network } from 'public-transport-js';

export interface NetworkResponse extends Response {
  locals: {
    network: Network;
  };
}
