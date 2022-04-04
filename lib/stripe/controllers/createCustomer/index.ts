import { prisma } from "@lib/prisma";
import Stripe from "stripe";

const createCustomer = async (customer: Stripe.Customer) => {
  try {
    await prisma.user.update({ where: { email: customer.email as string }, data: { customerId: customer.id } })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default createCustomer