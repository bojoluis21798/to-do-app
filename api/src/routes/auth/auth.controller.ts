import { Body, JsonController, Post } from 'routing-controllers';
import AuthService from './auth.service';
import CreateUserDto from './dto/create-user.dto';

@JsonController('/auth')
class AuthController {
  @Post('/register')
  async registerUser(@Body() user: CreateUserDto) {
    const token = await AuthService.createUser(user);

    return {
      message: 'User Created',
      token,
    };
  }

  @Post('/login')
  async loginUser(@Body() user: CreateUserDto) {
    const token = await AuthService.logInUser(user);

    return {
      message: 'User successfully logged in',
      token,
    };
  }
}

export default AuthController;
