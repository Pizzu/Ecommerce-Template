// Libraries
import Stripe from "stripe";
import { prisma } from "@lib/prisma";
import { getSession } from "next-auth/react";
// Types
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2020-08-27" })

type DeleteSubscriptionBody = {
  subscriptionID: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const { subscriptionID }: DeleteSubscriptionBody = req.body
  if (!session) {
    return res.status(401)
  }

  const user = await prisma.user.findUnique({ where: { email: session.user?.email as string } })

  if (!user?.proPlan) {
    return res.status(200).json({ subscripton: null })
  }

  const data = await stripe.subscriptions.update(subscriptionID, { cancel_at_period_end: true })
  // const data = await stripe.subscriptions.del(subscriptionID)

  return res.status(200).json({ subscription: data })
} 