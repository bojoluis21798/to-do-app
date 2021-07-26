import { model, Schema } from 'mongoose';

export interface User {
  userName: string;
  password: string;
}

const UserSchema = new Schema<User>({
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

export default model<User>('User', UserSchema);
