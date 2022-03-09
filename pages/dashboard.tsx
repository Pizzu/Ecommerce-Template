import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const DashboardPage: NextPage = () => {
  return (
    <div className="container">
      <h1>Dashboard page</h1>
    </div>
  )
}

export default DashboardPage

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
    props: { session },
  }
}