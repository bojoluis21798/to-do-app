import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import getBearerToken from 'utils/getBearerToken';
import { Service } from 'typedi';
import createHttpError from 'http-errors';

@Service()
class ExtractUser implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    const token = getBearerToken(req);

    if (token) {
      const user = jwt.decode(token);

      res.locals.user = user;

      next();
    } else {
      throw new createHttpError.Unauthorized('No Token');
    }
  }
}

export default ExtractUser;
