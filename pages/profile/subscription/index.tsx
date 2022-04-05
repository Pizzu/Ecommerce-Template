// Libraries
import Stripe from "stripe";
import { getSession } from "next-auth/react";
import { useUserSubscription } from "@hooks/useUserSubscription";
import { useAccount } from "@providers/AccountProvider";
import { useUserBilling } from "@hooks/useUserBilling";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Components
import Moment from "react-moment";
import { Button, ButtonLink } from "@components/common";
import { Loader } from "@components/common";

const SubscriptionPage: NextPage = () => {
  const { user } = useAccount()
  const { customer, isInitialized } = useUserSubscription()
  const { url } = useUserBilling()

  const handleCancelSubscription = async (subscriptionID: string) => {
    await fetch("/api/user/subscription/deleteUserSubscription", {
      method: "POST",
      body: JSON.stringify({ subscriptionID }),
      headers: { "content-type": "application/json" }
    }).then(res => res.json())
  }

  return (
    <main>
      <section>
        <div className="container py-[9rem]">
          <h1 className="mb-6">Membership</h1>
          <div className="mb-16">
            <h3 className="caption mb-5">Active Subscription</h3>
            {!isInitialized ?
              <Loader />
              :
              !customer ?
                <div className="bg-primary px-4 py-6 mt-10">
                  <p>⚠️ You do not have any active subscriptions!!!</p>
                </div>
                :
                customer?.subscriptions?.data.map((subscription: Stripe.Subscription) => (
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
                ))
            }
          </div>
          {user?.customerId &&
            <div>
              <h3 className="caption mb-6">Manage Billing Information</h3>
              <ButtonLink href={`${url ? url : ""}`} className="bg-primary text-white">Manage Billing</ButtonLink>
            </div>
          }
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