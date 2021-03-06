// Libraries
import Stripe from "stripe"
import useSWR from "swr"
import { useAccount } from "@providers/AccountProvider"

export const useUserSubscription = () => {
  const { isLogged } = useAccount()
  const { data, error, isValidating, ...rest } = useSWR(
    (isLogged) ? "/api/user/subscription/getUserSubscription" : null,
    async (url) => {
      const response: { customer: Stripe.Customer | null } = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" }
      }).then(res => res.json())

      return response
    }
  )

  return {
    customer: data?.customer || null,
    isInitialized: !!(data || error),
    error,
    isValidating,
    ...rest
  }
}