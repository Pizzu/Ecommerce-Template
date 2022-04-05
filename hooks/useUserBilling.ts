// Libraries
import Stripe from "stripe"
import useSWR from "swr"
import { useAccount } from "@providers/AccountProvider"

export const useUserBilling = () => {
  const { isLogged } = useAccount()
  const { data, error, isValidating, ...rest } = useSWR(
    (isLogged) ? "/api/user/manageBilling" : null,
    async (url) => {
      const response: { url: string | null } = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" }
      }).then(res => res.json())

      return response
    }
  )

  return {
    url: data?.url || null,
    error,
    isValidating,
    ...rest
  }
}