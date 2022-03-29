// Libraries
import { getSession } from "next-auth/react";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Components

const MembershipPage: NextPage = () => {
  return (
    <main>
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