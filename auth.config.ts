import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { z } from "zod";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });

        const { email, password } = schema.parse(credentials);

        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (!user) throw new Error("No user found");
        if (!user.password) throw new Error("No password set for user");
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid password");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
