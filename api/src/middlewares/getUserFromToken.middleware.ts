import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import getBearerToken from 'utils/getBearerToken';
import { Service } from 'typedi';

interface Options {
  complete: boolean;
}

@Service()
class GetUserFromToken {
  static injectToLocals(key: string = 'user', options?: Options) {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = getBearerToken(req);
      const user = jwt.decode(token);

      if (options && options.complete) {
        res.locals[key] = user;
      } else {
        res.locals[key] = user && typeof user === 'object' ? user._id : user;
      }

      next();
    };
  }
}

export default GetUserFromToken;
