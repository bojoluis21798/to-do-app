import { Response } from 'express';
import ValidJWT from 'middlewares/validJWT.middleware';
import {
  Body,
  Get,
  JsonController,
  Post,
  Res,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import AuthService from './auth.service';
import { UserDTO } from './model/user.model';

@JsonController('/auth')
@Service()
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() user: UserDTO) {
    await this.authService.createUser(user);

    return {
      message: 'User Created',
    };
  }

  @Post('/login')
  async loginUser(@Body() user: UserDTO, @Res() res: Response) {
    const token = await this.authService.logInUser(user);
    // 1 Day
    const cookieExpiration = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
      maxAge: cookieExpiration,
      httpOnly: true,
    });

    return {
      message: 'User successfully logged in',
    };
  }

  @Get('/check-session')
  @UseBefore(ValidJWT)
  async checkCookie() {
    return {
      message: 'Valid cookie',
    };
  }
}

export default AuthController;
