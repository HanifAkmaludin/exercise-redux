import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authOptions } from "./auth.config";
import { z } from 'zod';
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const { auth, signIn, signOut } = NextAuth({
  ...authOptions,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) return null;
        if (!user.password) return null; // Ensure password exists
        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
