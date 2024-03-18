import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // Add providers with an empty array for now
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/profile");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
