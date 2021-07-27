import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { RouteF } from 'types/Routes';

const router = Router();

const AuthRouter: RouteF = () => {
  router.post('/guest', (req: Request, res: Response) => {
    const guest = {
      userName: `Guest-${nanoid()}`,
      password: `Pass-${nanoid()}`,
    };

    const token = jwt.sign(guest, 'jwt-secret');

    res.send({
      message: 'Guest Created',
      guest: guest.userName,
      token,
    });
  });

  return { routeBaseUrl: '/auth', router };
};

export default AuthRouter;
