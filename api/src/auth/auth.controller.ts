import { Response } from 'express';
import { Body, JsonController, Post, Res } from 'routing-controllers';
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
}

export default AuthController;
