import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { IsHexColor, IsString } from 'class-validator';
import { UserModelSchema } from '../../auth/model/user.model';

export class TagsDTO {
  @prop()
  @IsString()
  name: string;

  @prop()
  @IsHexColor()
  color: string;
}

export class TagsModelSchema extends TagsDTO {
  @prop({ required: true })
  _id: string;
  @prop({ ref: () => UserModelSchema, type: () => String })
  user: Ref<UserModelSchema, string>;
}

export default getModelForClass(TagsModelSchema);
