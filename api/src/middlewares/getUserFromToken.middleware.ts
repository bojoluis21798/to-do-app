import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import getBearerToken from 'utils/getBearerToken';
import { Service } from 'typedi';

interface Options {
  complete: boolean;
}

@Service()
class GetUserFromToken {
  static injecToBody(key: string, options?: Options) {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = getBearerToken(req);
      const user = jwt.decode(token);

      if (options && !options.complete) {
        req.body[key] = user && typeof user === 'object' ? user._id : user;
      } else {
        req.body[key] = user;
      }

      next();
    };
  }

  static injectToLocals(key: string, options?: Options) {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = getBearerToken(req);
      const user = jwt.decode(token);

      if (options && !options.complete) {
        res.locals[key] = user && typeof user === 'object' ? user._id : user;
      } else {
        res.locals[key] = user;
      }

      next();
    };
  }
}

export default GetUserFromToken;
