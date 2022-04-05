// Libraries
import Stripe from "stripe";
import { prisma } from "@lib/prisma";
import { getSession } from "next-auth/react";
// Types
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2020-08-27" })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }
  const user = await prisma.user.findUnique({ where: { email: session.user?.email as string } })
  if (user?.customerId) {
    const billingSession = await stripe.billingPortal.sessions.create({
      customer: user?.customerId as string,
      return_url: `${req.headers.origin}/profile/subscription`,
    });

    res.status(200).json({ url: billingSession.url });
  } else {
    res.status(200).json({url: null})
  }
} 