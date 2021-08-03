import { IsEmail, MinLength } from 'class-validator';

class UserDTO {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

export default UserDTO;
