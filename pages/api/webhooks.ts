// Libraries
import Stripe from 'stripe'
import { buffer } from "micro"
import { prisma } from "@lib/prisma";
// Types
import { NextApiRequest, NextApiResponse } from "next";

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
        const customer = event.data.object as Stripe.Customer
        try {
          await prisma.user.update({ where: { email: customer.email as string }, data: { customerId: customer.id } })
        } catch (error: any) {
          res.status(500).send(`Webhook error: ${error.message}`)
        }
        break
      case "checkout.session.completed":
        const charge = event.data.object as Stripe.Checkout.Session
        console.log(charge)
        if (charge.mode === "subscription") {
          try { 
            await prisma.user.update({ where: { email: charge.customer_details?.email as string }, data: { proPlan: true } })
          } catch (error: any) {
            res.status(500).send(`Webhook error: ${error.message}`)
          }
        } else {
          try {
            const paymentIntent = await stripe.paymentIntents.retrieve(charge.payment_intent as string)
            const receiptURL = paymentIntent.charges.data[0].receipt_url
            await prisma.orderCourse.create({ data: { key: charge.metadata?.key || "", title: charge.metadata?.title || "", receipt: receiptURL as string, userId: charge.metadata?.user || "" } })
          } catch (error: any) {
            res.status(500).send(`Webhook error: ${error.message}`)
          }
        }
        break
      case 'customer.subscription.deleted':
        // The payment failed or the customer does not have a valid payment method.
        // console.log(event.data.object)
        break;
      case "charge.refunded":
        const refund = event.data.object as Stripe.Charge
        // We retrive the checkout session used to purchase the course by using the payment intent
        const checkoutSession = await stripe.checkout.sessions.list({ payment_intent: refund.payment_intent as string })
        // We get the userID and the courseID we want to refund
        const userID = checkoutSession.data[0].metadata?.user
        const courseID = checkoutSession.data[0].metadata?.key
        // We delete the refunded course for the specific user from the prisma db
        try {
          await prisma.orderCourse.deleteMany({ where: { key: courseID, AND: { userId: userID } } })
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