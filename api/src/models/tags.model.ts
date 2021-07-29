import { model, Schema } from 'mongoose';

export interface Tags {
  name: string;
  color: string;
}

const TagsSchema = new Schema<Tags>({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

export default model<Tags>('Tags', TagsSchema);
