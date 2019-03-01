import { Document, Schema, Model, model } from "mongoose";
import * as bcrypt from 'bcrypt';

export interface IUserModel extends Document {
  username: string,
  name: string,
  email: string,
  password: string,
  created: string,
  updated: string,
  movies: object,
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
  movies: Object,
});

UserSchema.pre('save', async function hashPassword(next) {
  try {
    const user = this as IUserModel

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});
const User: Model<IUserModel> = model<IUserModel>('users', UserSchema);

export default User
