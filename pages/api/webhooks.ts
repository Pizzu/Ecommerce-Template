import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe'
import { buffer } from "micro"
import { prisma } from "@lib/prisma";

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
    } catch (error: any) {
      console.log(`Webhook error: ${error.message}`)
      return res.status(400).send(`Webhook error: ${error.message}`)
    }

    console.log("Event:", event)

    switch (event.type) {
      case "customer.created":
        const customer = event.data.object as Stripe.Customer
        try {
          await prisma.user.update({ where: { email: customer.email as string }, data: { customerId: customer.id } })
        } catch (error: any) {
          res.status(500).send(`Webhook error: ${error.message}`)
        }
        break
      default:
        // Do Nothing
        console.log("Event not handled")
    }

    res.status(200).send("Success")
  }
}