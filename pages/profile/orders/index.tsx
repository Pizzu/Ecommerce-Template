// Libraries
import { getSession } from "next-auth/react";
import { prisma } from "@lib/prisma";
// Types
import type { GetServerSideProps, NextPage } from "next";
import type { OrderCourse } from "@prisma/client";
// Components
import { CourseList, OrderCourseCard } from "@components/course";

const OrdersPage: NextPage<{ orderCourses: OrderCourse[] }> = ({ orderCourses }) => {
  return (
    <main>
      <section>
        <div className="container py-[9rem]">
          <div className="mb-8">
            <h1>Your orders</h1>
            <p>Here you can find all your orders and download the receipts</p>
          </div>
          <div className="grid grid-flow-row gap-6">
            <CourseList courses={orderCourses} render={(orderCourse: OrderCourse) => <OrderCourseCard key={orderCourse.id} orderCourse={orderCourse}/>} />
          </div>
        </div>
      </section>
    </main>
  )
}

export default OrdersPage

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

  const currentUser = await prisma.user.findUnique({ where: { email: session.user?.email as string }, include: { orderCourses: true } })
  const orderCourses = currentUser?.orderCourses || []

  return {
    props: {
      session,
      orderCourses
    },
  }
}