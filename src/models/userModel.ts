import { Document, Schema, Model, model } from "mongoose";

export interface IUserModel extends Document {
  username: string,
  name: string,
  email: string,
  password: string,
  created: string,
  updated: string
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

export const Movie: Model<IUserModel> = model<IUserModel>('users', UserSchema);
