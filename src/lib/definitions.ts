import mongoose from "mongoose";

export type UserType = {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  image: string;
  createdAt: string;
};