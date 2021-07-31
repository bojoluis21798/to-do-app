import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
export class Tags {
  @prop()
  _id: string;
  @prop()
  name: string;
  @prop()
  color: string;
  @prop({ ref: () => User, type: () => String })
  created_by: Ref<User, string>;
}

export default getModelForClass(Tags);
