import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import AuthService from './auth.service';
import UserDTO from './dto/user.dto';

@JsonController('/auth')
@Service()
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() user: UserDTO) {
    const token = await this.authService.createUser(user);

    return {
      message: 'User Created',
      token,
    };
  }

  @Post('/login')
  async loginUser(@Body() user: UserDTO) {
    const token = await this.authService.logInUser(user);

    return {
      message: 'User successfully logged in',
      token,
    };
  }
}

export default AuthController;
