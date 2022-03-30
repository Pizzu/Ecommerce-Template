// Libraries
import { prisma } from "@lib/prisma";
import { getSession } from "next-auth/react";
// Types
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const { courseId } = req.query
  const user = await prisma.user.findUnique({ where: { email: session.user?.email as string } })
  const orderCourse = await prisma.orderCourse.findFirst({where: {key: courseId as string, AND: {userId: user?.id}}})

  return res.status(200).json(orderCourse || user?.proPlan ? true : false)
} 