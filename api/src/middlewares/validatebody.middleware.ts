import { validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

const validatebody =
  <Type extends Object>(dtoObject: Type) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body: Type = Object.assign(dtoObject, req.body);

    try {
      await validateOrReject(body);
      next();
    } catch (errors) {
      res.status(400).send(errors);
    }
  };

export default validatebody;
