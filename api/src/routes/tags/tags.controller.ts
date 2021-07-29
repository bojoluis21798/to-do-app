import { NextFunction, Request, Response } from 'express';
import validJWT from 'middlewares/validJWT.middleware';
import Controller from 'types/Controller';
import HTTPMethod from 'types/HTTPMethod';
import parseRoutes from 'utils/parseRoutes';

const baseUrl = '/tags';
const TagController: Controller = [
  {
    pathName: '/',
    method: HTTPMethod.GET,
    middlewares: [validJWT],
    handler: async (req: Request, res: Response, next: NextFunction) => {},
  },
];

export default parseRoutes(baseUrl, TagController);
