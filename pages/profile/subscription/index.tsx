// Libraries
import { getSession } from "next-auth/react";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Components

const SubscriptionPage: NextPage = () => {
  return (
    <main>
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