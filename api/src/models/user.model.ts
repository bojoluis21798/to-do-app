import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop()
  email: string;
  @prop({ selectable: false })
  password: string;
}

export default getModelForClass(User);
