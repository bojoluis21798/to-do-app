import { RequestHandler } from 'express';
import HTTPMethod from './HTTPMethod';

type Controller = {
  method: HTTPMethod;
  pathName: string;
  middlewares?: RequestHandler[];
  handler: RequestHandler;
}[];

export default Controller;
