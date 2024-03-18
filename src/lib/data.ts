import { Comment, Post, User } from "@/lib/models";
import { connectToDB } from "./utils";

export const fetchPosts = async (page: number) => {
  const POSTS_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Post.find().countDocuments();
    const posts = await Post.find()
      .limit(POSTS_PER_PAGE)
      .skip(POSTS_PER_PAGE * (page - 1));
    return { count, posts };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};

export const fetchPost = async (id: string) => {
  try {
    connectToDB();
    const post = await Post.findById(id);
    post.views += 1;
    await post.save();
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post");
  }
};

export const fetchComments = async (id: string) => {
  try {
    connectToDB();
    const comments = await Comment.find({ belongToPost: id });
    return comments;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch comments");
  }
};

export const fetchSidebarPosts = async () => {
  try {
    connectToDB();
    const posts = await Post.find();
    const sortedPosts = posts.sort((a, b) => b.views - a.views).slice(0, 5);
    return sortedPosts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts for sidebar");
  }
};

export const fetchFooterPosts = async () => {
  try {
    connectToDB();
    const posts = await Post.find();
    const sortedPosts = posts
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 2);
    return sortedPosts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts for footer");
  }
};

export const fetchSearchPosts = async (searchData: string) => {
  const regex = new RegExp(searchData, "i");

  try {
    connectToDB();
    const posts = await Post.find({ title: { $regex: regex } });
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts from search input");
  }
};

export const fetchAuthor = async (author: string) => {
  try {
    connectToDB();
    const user = await User.findOne({ email: author });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch author's name");
  }
};
