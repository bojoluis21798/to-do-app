import { getModelForClass, prop } from '@typegoose/typegoose';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class User {
  @prop()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @prop({ select: false })
  password: string;
}

class UserModel extends User {
  @prop()
  _id: string;
}

export default getModelForClass(UserModel);
