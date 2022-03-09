import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2020-08-27" })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { quantity } = req.body
  const { email } = req.body
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        // price_data: {
        //   currency: 'usd',
        //   product_data: {
        //     name: 'T-shirt',
        //   },
        //   unit_amount: 250,
        // },
        price: "price_1KaprQIgDGNpeWIZ94DAuzeB",
        quantity: 1
      },
    ],
    mode: 'subscription',
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/checkout`,
  });
  console.log(session.id)

  res.status(200).json({sessionId: session.id})
}
