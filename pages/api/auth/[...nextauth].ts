import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: "115857946070-ub9gjglnecjru3aremb110cjvba0npnd.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
})