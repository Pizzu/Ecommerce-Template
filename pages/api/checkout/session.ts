// Libraries
import Stripe from 'stripe'
import { getSession } from 'next-auth/react'
import { urlFor } from '@lib/sanity'
// Types
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Course } from '../../../types'

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2020-08-27" })

type CheckoutSessionBody = {
  user: User,
  course: Course,
  isSubscription: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { user, course, isSubscription }: CheckoutSessionBody = req.body
  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  // Retrive customer if exists
  const customerId = user.customerId || undefined

  let item: Stripe.Checkout.SessionCreateParams;

  if (isSubscription) {
    item = {
      payment_method_types: ["card"],
      customer_email: !customerId ? user.email as string : undefined,
      customer: customerId,
      metadata: {},
      line_items: [
        {
          price: "price_1KjTGWIgDGNpeWIZBGmejP44",
          quantity: 1
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/dashboard`,
      cancel_url: `${req.headers.origin}/membership`,
    }
  } else {
    item = {
      payment_method_types: ["card"],
      customer_email: !customerId ? user.email as string : undefined,
      customer: customerId,
      metadata: {
        key: course._id,
        title: course.title,
        user: user.id
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description,
              images: [urlFor(course.coverImage).url()]
            },
            unit_amount: 1900,
          },
          quantity: 1
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/dashboard`,
      cancel_url: `${req.headers.origin}/courses/${course.slug.current}`,
    }
  }

  // Create check out session
  const checkoutSession = await stripe.checkout.sessions.create(item);

  res.status(200).json({ sessionId: checkoutSession.id })
}
