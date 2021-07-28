import { Request, Response } from 'express';
import AuthService from './auth.service';

const AuthController = {
  /**
   * @route /guest
   * @method POST
   * @payload none
   * @description Sends guest userID and JWT token
   */
  registerGuest: [
    (req: Request, res: Response) => {
      const guest = AuthService.createGuest();

      res.send(guest);
    },
  ],
};

export default AuthController;
