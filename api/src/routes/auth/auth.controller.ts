import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import AuthService from './auth.service';
import CreateUserDto from './dto/create-user.dto';

@JsonController('/auth')
@Service()
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() user: CreateUserDto) {
    const token = await this.authService.createUser(user);

    return {
      message: 'User Created',
      token,
    };
  }

  @Post('/login')
  async loginUser(@Body() user: CreateUserDto) {
    const token = await this.authService.logInUser(user);

    return {
      message: 'User successfully logged in',
      token,
    };
  }
}

export default AuthController;
