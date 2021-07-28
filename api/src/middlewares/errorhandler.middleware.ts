import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Error', err);
  if (err instanceof HttpError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500);
  }
};

export default errorHandler;
