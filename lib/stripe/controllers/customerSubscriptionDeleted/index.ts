import { prisma } from "@lib/prisma"
import Stripe from "stripe"

const customerSubscriptionDeleted = async (subscription: Stripe.Subscription, stripe: Stripe) => {
  try {
    // Fetch customer and update pro plan field back to false
    const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer
    await prisma.user.update({ where: { email: customer.email as string }, data: { proPlan: false } })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default customerSubscriptionDeleted