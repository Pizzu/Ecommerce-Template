// Libraries
import { prisma } from "@lib/prisma";
import { sanityClient } from "@lib/sanity";
import { ownedCoursesQuery } from "@lib/sanity/query";
import { getSession } from "next-auth/react";
// Types
import type { GetServerSideProps, NextPage } from "next";
import type { Course } from "../types";
// Components
import { CourseList, CourseCard } from "@components/course";

const DashboardPage: NextPage<{ courses: [Course] }> = ({ courses }) => {
  return (
    <div className="container py-[9rem]">
      <h1>Keep watching your courses</h1>
      <p>Here you can find all the courses you own</p>
      <div className="mt-10 grid grid-cols-2 gap-24 sm:grid-cols-1">
        <CourseList courses={courses} render={(course: Course) => <CourseCard key={course._id} course={course} />} />
      </div>
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

  // We retrive the current user from the session and we fetch it from the db with all the ownedCourses
  const currentUser = await prisma.user.findUnique({ where: { email: session.user?.email as string }, include: { ownedCourses: true } })
  const coursesIDs = currentUser?.ownedCourses.map(ownedCourse => ownedCourse.key)
  // We query exactly the courses owned by that user from sanity
  const courses: [Course] = await sanityClient.fetch(ownedCoursesQuery, { coursesIDs })

  return {
    props: {
      session,
      courses
    },
  }
}