// Libraries
import { getSession } from "next-auth/react";
import { sanityClient } from "@lib/sanity";
import { courseQuery } from "@lib/sanity/query";
// Types
import type { GetServerSideProps, NextPage } from "next";
import type { Course } from "../../../types";
// Components
import { CourseBody, CourseHero, CourseCurriculum, CoursePayment } from "@components/course";

const CoursePage: NextPage<{ course: Course }> = ({ course }) => {
  return (
    <main>
      <CourseHero title={course.title} description={course.description} coverImage={course.coverImage} />
      <CourseBody body={course.body} />
      <CoursePayment course={course} />
      <CourseCurriculum lectures={course.lectures} courseSlug={course.slug}/>
    </main>
  )
}

export default CoursePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
  const course: Course = await sanityClient.fetch(courseQuery, { slug })

  return {
    props: {
      session: await getSession(context),
      course
    }
  }
}