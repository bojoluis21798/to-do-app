import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from 'routing-controllers';
import { Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: NextFunction) {
    console.log('Error: ' + error);
    if (error instanceof HttpError) {
      response.status(error.statusCode).send(error);
    } else if ('httpCode' in error) {
      response.status(error.httpCode).send(error);
    } else {
      response.status(500).send(error);
    }
  }
}

export default ErrorHandler;
