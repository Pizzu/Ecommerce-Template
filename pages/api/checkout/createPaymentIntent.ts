import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import Stripe from 'stripe'

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2020-08-27" })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({req})
  
  if (session) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1900,    
      currency: "usd",
      payment_method_types: ['card']
    })

    res.status(200).json(paymentIntent)
  } else {
    res.status(400).send("No session found!!!")
  }
}
