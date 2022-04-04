// Libraries
import Stripe from 'stripe'
import { buffer } from "micro"
import { prisma } from "@lib/prisma";
// Types
import { NextApiRequest, NextApiResponse } from "next";
import { checkoutSessionCompleted, createCustomer, customerSubscriptionDeleted, chargeRefunded } from '@lib/stripe/controllers';

export const config = {
  api: {
    bodyParser: false
  }
}

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: "2020-08-27" })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const buf = await buffer(req)
    const signature = req.headers["stripe-signature"]
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET

    let event

    try {
      if (!signature || !webhookSecret) return
      event = stripe.webhooks.constructEvent(buf, signature, webhookSecret)
      console.log(event.data.object)
    } catch (error: any) {
      console.log(`Webhook error: ${error.message}`)
      return res.status(400).send(`Webhook error: ${error.message}`)
    }

    switch (event.type) {
      case "customer.created":
        try {
          await createCustomer(event.data.object as Stripe.Customer)
        } catch (error: any) {
          res.status(500).send(`Webhook error: ${error.message}`)
        }
        break
      case "checkout.session.completed":
        try {
          await checkoutSessionCompleted(event.data.object as Stripe.Checkout.Session, stripe)
        } catch (error: any) {
          res.status(500).send(`Webhook error: ${error.message}`)
        }
        break
      case 'customer.subscription.deleted':
        try {
          await customerSubscriptionDeleted(event.data.object as Stripe.Subscription, stripe)
        } catch (error: any) {
          res.status(500).send(`Webhook error: ${error.message}`)
        }
        break;
      case "charge.refunded":
        try {
          await chargeRefunded(event.data.object as Stripe.Charge, stripe)
        } catch (error: any) {
          res.status(500).send(`Webhook error: ${error.message}`)
        }
      default:
        // Do Nothing
        console.log("Event not handled")
    }

    res.status(200).send("Success")
  }
}