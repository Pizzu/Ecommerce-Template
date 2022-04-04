// Libraries
import Stripe from "stripe";
import useSWR from "swr";
import { getSession } from "next-auth/react";
import { useMemo } from "react";
import { useAccount } from "@providers/AccountProvider";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Components
import Moment from "react-moment";
import { Button, ButtonLink } from "@components/common";

const SubscriptionPage: NextPage = () => {

  const { user, isLogged } = useAccount()

  const { data, error, isValidating, ...rest } = useSWR(
    (isLogged && user) ? "/api/user/subscription/getUserSubscription" : null,
    async (url) => {
      const { customer }: { customer: Stripe.Customer | null } = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" }
      }).then(res => res.json())

      return customer
    }
  )

  const handleCancelSubscription = async (subscriptionID: string) => {
    console.log(subscriptionID)
    const { subscription }: { subscription: Stripe.Subscription | null } = await fetch("/api/user/subscription/deleteUserSubscription", {
      method: "POST",
      body: JSON.stringify({ subscriptionID }),
      headers: { "content-type": "application/json" }
    }).then(res => res.json())

    console.log(subscription)
  }

  return (
    <main>
      <section>
        <div className="container py-[9rem]">
          <h1 className="mb-6">Membership</h1>
          <div className="mb-16">
            <h3 className="caption mb-5">Active Subscription</h3>
            {data?.subscriptions?.data.map((subscription: Stripe.Subscription) => (
              <div key={subscription.id} className="bg-white p-8 shadow-xl">
                <div className="mb-8">
                  <h3>Pro Membership Plan</h3>
                </div>
                <div className="grid grid-flow-col gap-6 mb-16">
                  <div>
                    <p className="caption">Start Subscription</p>
                    <Moment className="caption" unix format={"MM/DD/YYYY"}>{subscription.current_period_start}</Moment>
                  </div>
                  <div>
                    <p className="caption">End Subscription</p>
                    <Moment className="caption" unix format={"MM/DD/YYYY"}>{subscription.current_period_end}</Moment>
                  </div>
                </div>
                <div className="grid grid-flow-col justify-start gap-6">
                  <Button
                    onClick={() => handleCancelSubscription(subscription.id)}
                    className="bg-primary text-white">
                    Cancel Subscription
                  </Button>
                  <ButtonLink
                    href={(subscription.latest_invoice as Stripe.Invoice).hosted_invoice_url as string}
                    newTab={true}
                    className="bg-secondary text-white">
                    Download Invoice
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="caption">Manage Billing Information</h3>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SubscriptionPage

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
    props: {
      session,
    },
  }
}