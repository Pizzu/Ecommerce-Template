import { Button } from "@components/common"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

const CheckoutForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()

  console.log(stripe)
  console.log(elements)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }
    
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/dashboard`
      }
    })

    if (result.error) {
      console.log(result.error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-flow-row auto-rows-auto gap-6">
        <PaymentElement />
        <Button isDisabled={!stripe} className="bg-primary text-white justify-self-start">Buy Now</Button>
      </div>
    </form>
  )
}

export default CheckoutForm