import { prisma } from "@lib/prisma"
import Stripe from "stripe"

const chargeRefunded = async (charge: Stripe.Charge, stripe: Stripe) => {
  // We retrive the checkout session used to purchase the course by using the payment intent
  const checkoutSession = await stripe.checkout.sessions.list({ payment_intent: charge.payment_intent as string })
  // We get the userID and the courseID we want to refund
  const userID = checkoutSession.data[0].metadata?.user
  const courseID = checkoutSession.data[0].metadata?.key
  // We delete the refunded course for the specific user from the prisma db
  try {
    await prisma.orderCourse.deleteMany({ where: { key: courseID, AND: { userId: userID } } })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default chargeRefunded