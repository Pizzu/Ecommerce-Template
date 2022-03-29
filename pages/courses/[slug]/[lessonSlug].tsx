// Libraries
import { sanityClient } from "@lib/sanity";
import { getSession } from "next-auth/react";
import { courseLessonQuery } from "@lib/sanity/query";
// Types
import type { GetServerSideProps, NextPage } from "next";
import type { Course, CourseLesson } from "../../../types";
// Components
import { LessonCurriculum, LessonBody } from "@components/lesson";

const LessonPage: NextPage<{ course: Course & { currentLecture: CourseLesson } }> = ({ course }) => {
  return (
    <section>
      <div className="grid grid-flow-row items-stretch">
        <LessonCurriculum course={course}/>
        <LessonBody course={course} />
      </div>
    </section>
  )
}

export default LessonPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug, lessonSlug } = context.query
  const course: Course = await sanityClient.fetch(courseLessonQuery, { slug, lessonSlug })

  return {
    props: {
      session: await getSession(context),
      course: course ? course : null
    },
    notFound: !course ? true : false
  }
}