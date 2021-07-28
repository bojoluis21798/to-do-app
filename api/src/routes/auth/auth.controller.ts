import { NextFunction, Request, Response } from 'express';
import validatebody from 'middlewares/validatebody.middleware';
import Controller from 'types/Controller';
import HTTPMethod from 'types/HTTPMethod';
import parseRoutes from 'utils/parseRoutes';
import AuthService from './auth.service';
import CreateUserDto from './dto/create-user.dto';

const baseUrl = '/auth';

const AuthController: Controller = [
  {
    pathName: '/register',
    method: HTTPMethod.POST,
    middlewares: [validatebody(new CreateUserDto())],
    handler: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = await AuthService.createUser(req.body);

        res.send({
          message: 'User Created',
          token,
        });
      } catch (error) {
        next(error);
      }
    },
  },
  {
    pathName: '/login',
    method: HTTPMethod.POST,
    middlewares: [validatebody(new CreateUserDto())],
    handler: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = await AuthService.logInUser(req.body);

        res.send({
          message: 'User successfully logged in',
          token,
        });
      } catch (error) {
        next(error);
      }
    },
  },
];

export default parseRoutes(baseUrl, AuthController);
