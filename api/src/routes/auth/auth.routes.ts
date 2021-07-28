import { Router } from 'express';
import { RouteProvider } from 'types/Routes';
import AuthController from './auth.controller';

const router = Router();

const AuthRouter: RouteProvider = () => {
  router.post('/guest', AuthController.registerGuest);

  return { routeBaseUrl: '/auth', router };
};

export default AuthRouter;
