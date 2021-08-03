import { getModelForClass, prop } from '@typegoose/typegoose';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDTO {
  @prop()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @prop({ select: false })
  password: string;
}

export class UserModelSchema extends UserDTO {
  @prop({ required: true })
  _id: string;
}

export default getModelForClass(UserModelSchema);
