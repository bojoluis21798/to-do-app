import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import AuthService from './auth.service';
import { User } from './model/user.model';

@JsonController('/auth')
@Service()
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() user: User) {
    await this.authService.createUser(user);

    return {
      message: 'User Created',
    };
  }

  @Post('/login')
  async loginUser(@Body() user: User) {
    const token = await this.authService.logInUser(user);

    return {
      message: 'User successfully logged in',
      token,
    };
  }
}

export default AuthController;
