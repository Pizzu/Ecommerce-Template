// Libraries
import useSWR from "swr";
import { getSession } from "next-auth/react";
import { useAccount } from "@providers/AccountProvider";
import { useEffect } from "react";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Components

const SubscriptionPage: NextPage = () => {

  const { user, isLogged } = useAccount()

  const { data, error, isValidating, ...rest } = useSWR(
    (isLogged && user) ? "/api/user/subscription/getUserSubscription" : null,
    async (url) => {
      const subscription: any = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" }
      }).then(res => res.json())

      return subscription
    }
  )

  console.log(data)

  return (
    <main>
      <section>
        <div className="container py-[9rem]">
          <h1 className="mb-6">Membership</h1>
          <div className="mb-16">
            <h3 className="caption">Active Subscription</h3>
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