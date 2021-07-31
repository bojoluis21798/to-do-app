import { getModelForClass, prop } from '@typegoose/typegoose';
export class Tags {
  @prop()
  _id: string;
  @prop()
  name: string;
  @prop()
  color: string;
  @prop()
  created_by: string;
}

export default getModelForClass(Tags);
