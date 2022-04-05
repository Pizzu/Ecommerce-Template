// Libraries
import Stripe from "stripe"
import useSWR from "swr"
import { useAccount } from "@providers/AccountProvider"

export const useUserSubscription = () => {
  const { user, isLogged } = useAccount()
  const { data, error, isValidating, ...rest } = useSWR(
    (isLogged && user?.proPlan) ? "/api/user/subscription/getUserSubscription" : null,
    async (url) => {
      const { customer }: { customer: Stripe.Customer | null } = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" }
      }).then(res => res.json())

      return customer
    }
  )

  return {
    customer: data ? data : null,
    isInitialized: !!(data || error),
    error,
    isValidating,
    ...rest
  }
}