import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TagsModelSchema } from '../../tags/model/tags.model';
import { UserModelSchema } from '../../auth/model/user.model';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class TodoDTO {
  @prop()
  @IsString()
  name: string;

  @prop()
  @IsDateString()
  date: string;

  @prop({ ref: () => TagsModelSchema, type: () => String })
  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @prop()
  @IsOptional()
  @IsBoolean()
  completed: boolean;
}

export class TodoModelSchema extends TodoDTO {
  @prop({ required: true })
  _id: string;
  @prop({ ref: () => UserModelSchema, type: () => String })
  user: Ref<UserModelSchema, string>;
}

export default getModelForClass(TodoModelSchema);
