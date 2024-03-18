import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { UserType } from "@/lib/definitions";
import bcrypt from "bcrypt";
import { connectToDB } from "@/lib/utils";
import { User } from "@/lib/models";

async function getUser(email: string): Promise<UserType | undefined> {
  try {
    connectToDB();
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return {
            name: user.username,
            email: user.email,
            image: user.image,
          };
        }
        
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
