"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { connectToDB } from "@/lib/utils";
import { Comment, Post, User } from "@/lib/models";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const logOut = async () => {
  await signOut();
};

export const register = async (
  prevState: { error: string } | undefined,
  formData: FormData,
) => {
  const { username, email, password } = Object.fromEntries(formData);

  try {
    connectToDB();

    const isUser = await User.findOne({ username });
    if (isUser) {
      return { error: "Username already exists" };
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return { error: "Email already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: "https://placehold.co/600x400.png?text=No+Image",
    });
    await newUser.save();
  } catch (error) {
    throw new Error(error as any);
  }

  redirect("/login");
};

export const newPost = async (
  prevState: { success: string } | undefined,
  formData: FormData,
) => {
  const { title, author, text, image } = Object.fromEntries(formData);

  try {
    connectToDB();

    const newPost = new Post({
      title,
      author,
      text,
      image: image || "https://placehold.co/600x400.png?text=No+Image",
    });
    await newPost.save();
    revalidatePath("/");
    return { success: "Post has been created" };
  } catch (error) {
    throw new Error(error as any);
  }
};

export const newComment = async (
  prevState: { success: boolean } | undefined,
  formData: FormData,
) => {
  const { commentator, commentText, belongToPost } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newComment = new Comment({
      commentator,
      commentText,
      belongToPost,
    });
    await newComment.save();
    revalidatePath(`/${belongToPost}`);
    return { success: true };
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateUser = async (
  prevState: { error: string } | { success: boolean } | undefined,
  formData: FormData,
) => {
  const { username, email, image } = Object.fromEntries(formData);

  try {
    connectToDB();

    const oldName = await User.findOne({ email });
    const anotherUser = await User.findOne({ username });

    if (anotherUser && oldName.username !== username) {
      return { error: "Username already exists" };
    }

    const updateFields: { [key: string]: any } = {
      username,
      image,
    };

    Object.keys(updateFields).forEach((key) => {
      (updateFields[key] === "" || undefined) && delete updateFields[key];
    });

    await User.findOneAndUpdate({ email }, updateFields);
    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    throw new Error(error as any);
  }
};

export const editPost = async (
  prevState: { success: boolean } | undefined,
  formData: FormData,
) => {
  const { _id, text } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      text,
    };

    await Post.findByIdAndUpdate(_id, updateFields);
    revalidatePath(`/${_id}`);
    return { success: true };
  } catch (error) {
    throw new Error(error as any);
  }
};

export const editComment = async (
  prevState: { success: boolean } | undefined,
  formData: FormData,
) => {
  const { postId, _id, commentText } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      commentText,
    };

    await Comment.findByIdAndUpdate(_id, updateFields);
    revalidatePath(`/${postId}`);
    return { success: true };
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteComment = async (formData: FormData) => {
  const { postId, _id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Comment.findByIdAndDelete(_id);
    revalidatePath(`/${postId}`);
  } catch (error) {
    throw new Error(error as any);
  }
};
