import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Tags } from './tags.model';
import { User } from './user.model';

export class Todo {
  @prop()
  _id: string;
  @prop()
  name: string;
  @prop()
  date: string;
  @prop({ ref: () => Tags, type: () => String })
  tag: Ref<Tags, string>[];
  @prop({ ref: () => User, type: () => String })
  created_by: Ref<User, string>;
}

export default getModelForClass(Todo);
