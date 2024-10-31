import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import "next-auth/jwt";

interface IUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    statusCode: number;
    accessToken: string;
    user: IUser;
    message: string;
  }
  interface User {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    statusCode: number;
    accessToken: string;
    user: IUser;
    message: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch("http://localhost:1912/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            throw new Error("Invalid login credentials.");
          }
          const res = await response.json();
          
          if (res) {
            return {
              id: res?.data?.user?.id,
              name: res?.data?.user?.name,
              email: res?.data?.user?.email,
              accessToken: res?.data?.accessToken,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Error during login. Please try again.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as IUser;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
