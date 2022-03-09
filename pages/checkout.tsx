import type { NextPage, GetServerSideProps } from 'next'
import { getSession } from "next-auth/react"
import getStripe from "@lib/stripe"
import { useAccount } from '@providers/AccountProvider'

const Checkout: React.FC = () => {

  const { user } = useAccount()

  const handleClick = async () => {
    // Call backend to create the checkout session
    const { sessionId } = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: user?.email || "" })
    }).then(res => res.json())
    // When the users clicks on the button, redirect them to the checkout
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({ sessionId })
    console.warn(error.message);
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <button onClick={handleClick}>Checkout</button>
    </div>
  )
}

export default Checkout

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}