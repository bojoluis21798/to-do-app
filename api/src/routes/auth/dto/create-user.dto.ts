import { IsEmail, MinLength } from 'class-validator';
import { User } from 'models/user.model';

class UserDTO implements User {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

export default UserDTO;
