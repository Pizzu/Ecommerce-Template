import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({req})
  
  if (!session) {
    return res.status(401)
  }

  const user = await prisma.user.findUnique({where: {email: session.user?.email as string}})
  return res.status(200).json(user)
} 