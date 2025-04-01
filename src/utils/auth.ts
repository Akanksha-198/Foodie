import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connect";

// Declaring module properly
declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      isAdmin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin?: boolean; // Optional to prevent undefined errors
  }
}

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error("Missing Google OAuth credentials in .env file");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = {
          ...session.user,
          isAdmin: token.isAdmin ?? false, 
        };
      }
      return session;
    },

    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      token.isAdmin = userInDb?.isAdmin ?? false; 
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
