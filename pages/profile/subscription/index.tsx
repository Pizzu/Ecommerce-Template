// Libraries
import Stripe from "stripe";
import { getSession } from "next-auth/react";
import { useUserSubscription } from "@hooks/useUserSubscription";
import { useAccount } from "@providers/AccountProvider";
import { useUserBilling } from "@hooks/useUserBilling";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Components
import { ButtonLink } from "@components/common";
import { Loader } from "@components/common";
import { SubscriptionItem } from "@components/user";
import { NextSeo } from "next-seo";

const SubscriptionPage: NextPage = () => {
  const { user } = useAccount()
  const { customer, isInitialized, mutate } = useUserSubscription()
  const { url } = useUserBilling()

  const handleCancelSubscription = async (subscriptionID: string) => {
    await fetch("/api/user/subscription/deleteUserSubscription", {
      method: "POST",
      body: JSON.stringify({ subscriptionID }),
      headers: { "content-type": "application/json" }
    }).then(res => res.json())

    mutate()
  }

  return (
    <>
      <NextSeo
        title="Subscription"
        description="Check your active subscription and manage your billing informations"
      />
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
                    <SubscriptionItem key={subscription.id} subscription={subscription} handleCancelSubscription={() => handleCancelSubscription(subscription.id)} />
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
    </>
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