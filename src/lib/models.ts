import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      uniq: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const postSchema = new Schema(
  {
    title: String,
    author: String,
    text: String,
    image: {
      type: String,
      default: "https://placehold.co/600x400.png?text=No+Image",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const commentSchema = new Schema(
  {
    commentator: String,
    commentText: String,
    belongToPost: String,
  },
  { timestamps: true },
);

export const User = models.User || model("User", userSchema);
export const Post = models.Post || model("Post", postSchema);
export const Comment = models.Comment || model("Comment", commentSchema);
