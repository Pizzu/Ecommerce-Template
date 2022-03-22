// Libraries
import getStripe from "@lib/stripe"
import { useAccount } from "@providers/AccountProvider"
// Types
import type { Course } from "../../../types"
// Components
import { Button, ButtonLink } from "@components/common"

type CoursePaymentProps = {
  course: Course
}

const CoursePayment: React.FC<CoursePaymentProps> = ({ course }) => {
  const { user, isLogged, isLoading } = useAccount()

  const handleCheckout = async () => {
    // Call backend to create the checkout session
    if (isLogged) {
      const { sessionId } = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          user,
          course
        })
      }).then(res => res.json())
      // When the users clicks on the button, redirect them to the checkout
      const stripe = await getStripe()
      const { error } = await stripe!.redirectToCheckout({ sessionId })
      console.warn(error.message);
    }
  }

  return (
    <section>
      <div className="container">
        <div className="text-center">
          {!isLoading &&
            isLogged ?
            <Button isDisabled={!isLogged} onClick={handleCheckout} className="bg-primary text-white">Buy at $19.00</Button>
            :
            <ButtonLink href="/" className="bg-primary text-white">Sign In to buy</ButtonLink>
          }

        </div>
      </div>
    </section>
  )
}

export default CoursePayment