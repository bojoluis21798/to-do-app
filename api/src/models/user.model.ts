import { model, Schema } from 'mongoose';

export interface User {
  email: string;
  password: string;
}

const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default model<User>('User', UserSchema);
