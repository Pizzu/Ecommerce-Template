// Libraries
import { useAccount } from "@providers/AccountProvider";
import { getSession } from "next-auth/react";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Components
import { ProfileItem } from "@components/user";
import { NextSeo } from "next-seo";

const ProfilePage: NextPage = () => {

  const { user } = useAccount()

  return (
    <>
      <NextSeo
        title="Profile"
        description="Check your active subscription, orders and receipts, and upgrade to pro"
      />
      <main>
        <section>
          <div className="container py-[9rem]">
            <div className="mb-8">
              <h1>Your Profile</h1>
              <p>Hi {user?.name}. Your current membership status is
                <span className="ml-2 text-secondary">{user?.proPlan ? "PRO" : "BASIC"}</span>.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-1">
              <ProfileItem iconURL="/receipt.svg" caption="Check your orders and download receipts here" ctaText="My Orders" ctaURL="/profile/orders" />
              <ProfileItem iconURL="/contract.svg" caption="Check and manage your current subscription here" ctaText="My Subscription" ctaURL="/profile/subscription" />
              <ProfileItem iconURL="/rocket.svg" caption="Upgrade to PRO and enjoy all the courses" ctaText="Become PRO Now" ctaURL="/membership" />
            </div>
          </div>
        </section>
      </main>
    </>

  )
}

export default ProfilePage

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