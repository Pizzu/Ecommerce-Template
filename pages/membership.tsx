// Libraries
import { getSession } from "next-auth/react";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Components
import { MembershipItem } from "@components/user";

const MembershipPage: NextPage = () => {
  return (
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