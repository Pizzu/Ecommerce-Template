import { Elements, PaymentElement, CardElement } from "@stripe/react-stripe-js"
import getStripe from "@lib/stripe"
import { Button } from "@components/common"
import { useState } from "react"
import Stripe from "stripe"
import type { Course } from "../../../types"
import { useAccount } from "@providers/AccountProvider"
import { appearance } from "@lib/stripe/utils/appearance"
import { CheckoutForm } from "@components/stripe"

type CoursePaymentProps = {
  course: Course
}

const CoursePayment: React.FC<CoursePaymentProps> = ({ course }) => {
  const { user, isLogged } = useAccount()
  const [paymentIntent, setPaymentIntent] = useState<Stripe.Response<Stripe.PaymentIntent>>()

  const createPaymentIntent = async () => {
    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await fetch("/api/checkout/createPaymentIntent", {
      method: "POST",
      headers: { "content-type": "application/json" },
    }).then(res => res.json())

    console.log(paymentIntent)
    setPaymentIntent(paymentIntent)
  }

  return (
    <section>
      <div className="container">
        {!paymentIntent ?
          <Button onClick={createPaymentIntent} className="bg-primary text-white">Buy at $19.00</Button>
          :
          <Elements stripe={getStripe()} options={{ clientSecret: paymentIntent?.client_secret as string, appearance }}>
            <div className={`mx-auto max-w-xl p-8 shadow-xl`}>
              <div className="mb-6">
                <h5 className="text-primary">{course.title}</h5>
                <p className="">$19.00</p>
              </div>
              <CheckoutForm />
            </div>
          </Elements>
        }
      </div>
    </section>
  )
}

export default CoursePayment