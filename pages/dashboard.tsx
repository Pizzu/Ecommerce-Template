import { OwnedCourse, User } from "@prisma/client";
import { prisma } from "@lib/prisma";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { sanityClient } from "@lib/sanity";
import { ownedCoursesQuery } from "@lib/sanity/query";
import type { Course } from "../types";

const DashboardPage: NextPage<{ courses: [Course] }> = ({courses}) => {
  return (
    <div className="container">
      <h1>Dashboard page</h1>
      <h3>{courses[0].title}</h3>
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
  const currentUser = await prisma.user.findUnique({where: {email: session.user?.email as string}, include: {ownedCourses: true} })
  const coursesIDs = currentUser?.ownedCourses.map(ownedCourse => ownedCourse.key)
  // We query exactly the courses owned by that user from sanity
  const courses: [Course] = await sanityClient.fetch(ownedCoursesQuery, {coursesIDs})

  return {
    props: { 
      session,
      courses
    },
  }
}