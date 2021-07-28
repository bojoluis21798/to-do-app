import { Request, Response } from 'express';
import validatebody from 'middlewares/validatebody.middleware';
import AuthService from './auth.service';
import CreateUserDto from './dto/create-user.dto';

const AuthController = {
  /**
   * @route /register
   * @method POST
   * @payload User
   * @description Register User.
   */
  register: [
    validatebody(new CreateUserDto()),
    (req: Request, res: Response) => {
      res.send(AuthService.createUser(req.body));
    },
  ],
};

export default AuthController;
