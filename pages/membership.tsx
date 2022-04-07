// Libraries
import { getSession } from "next-auth/react";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Components
import { MembershipItem } from "@components/user";
import { NextSeo } from "next-seo";

const MembershipPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Membership"
        description="Upgrade now to PRO and get access to all the published courses"
      />
      <main>
        <section>
          <div className="container py-[9rem]">
            <h1>Upgrade to Pro Now</h1>
            <div className="grid grid-flow-row mt-8">
              <MembershipItem iconURL="/rocket.svg" price={25} />
            </div>
          </div>
        </section>
      </main>
    </>

  )
}

export default MembershipPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}