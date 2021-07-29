import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { ExpressMiddlewareInterface } from 'routing-controllers';

class ValidJWT implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token && jwt.verify(token, 'jwt-secret')) {
      next();
    } else {
      throw new createHttpError.Unauthorized();
    }
  }
}

export default ValidJWT;