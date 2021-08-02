import Config from 'config/Config';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import getBearerToken from 'utils/getBearerToken';

@Service()
class ValidJWT implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    const token = getBearerToken(req);

    if (token && jwt.verify(token, Config.JWT_SECRET)) {
      next();
    } else {
      throw new createHttpError.Unauthorized('Invalid Token');
    }
  }
}

export default ValidJWT;
