import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare, hash } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!existingUser) return null;
        const passowrdMatched = await compare(
          credentials.password,
          existingUser?.password!,
        );
        if (!passowrdMatched) return null;

        return {
          id: existingUser?.id,
          name: existingUser?.name,
          email: existingUser?.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
          id:user.id
        };
      }
      return token;
    },
    async session({session, token}){
      return {
        ...session,
        user:{
          ...session.user,
          name:token.name,
          id:token.id
        }
      }
    }
  },
};
