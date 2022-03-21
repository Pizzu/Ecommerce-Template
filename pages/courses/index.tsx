// Libraries
import { sanityClient } from "@lib/sanity";
import { coursesQuery } from "@lib/sanity/query";
import { getSession } from "next-auth/react";
// Types
import { GetServerSideProps, NextPage } from "next";
import type { Course } from "../../types";
// Components
import { CourseList, CourseCard } from "@components/course";

const CoursesPage: NextPage<{ courses: [Course] }> = ({ courses }) => {
  return (
    <section>
      <div className="container py-[9rem]">
        <h1>All my courses</h1>
        <div className="mt-10 grid grid-cols-2 gap-24 sm:grid-cols-1">
          <CourseList courses={courses} render={(course: Course) => <CourseCard key={course._id} course={course} />} />
        </div>
      </div>
    </section>
  )
}

export default CoursesPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courses: [Course] = await sanityClient.fetch(coursesQuery)

  return {
    props: {
      session: await getSession(context),
      courses
    }
  }
} 