import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop()
  _id: string;
  @prop()
  email: string;
  @prop({ select: false })
  password: string;
}

export default getModelForClass(User);
