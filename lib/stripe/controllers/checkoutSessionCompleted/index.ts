import { prisma } from "@lib/prisma"
import Stripe from "stripe"

const checkoutSessionCompleted = async (checkoutSession: Stripe.Checkout.Session, stripe: Stripe) => {
  if (checkoutSession.mode === "subscription") {
    try { 
      await prisma.user.update({ where: { email: checkoutSession.customer_details?.email as string }, data: { proPlan: true } })
    } catch (error: any) {
      throw new Error(error.message)
    }
  } else {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(checkoutSession.payment_intent as string)
      const receiptURL = paymentIntent.charges.data[0].receipt_url
      await prisma.orderCourse.create({ data: { key: checkoutSession.metadata?.key || "", title: checkoutSession.metadata?.title || "", receipt: receiptURL as string, userId: checkoutSession.metadata?.user || "" } })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export default checkoutSessionCompleted