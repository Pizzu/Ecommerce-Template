// Libraries
import { sanityClient, urlFor } from "@lib/sanity";
import { getSession } from "next-auth/react";
import { courseLessonQuery } from "@lib/sanity/query";
// Types
import type { GetServerSideProps, NextPage } from "next";
import type { Course, CourseLesson } from "../../../types";
// Components
import { LessonCurriculum, LessonBody } from "@components/lesson";
import { NextSeo } from "next-seo";

const LessonPage: NextPage<{ course: Course & { currentLecture: CourseLesson } }> = ({ course }) => {
  return (
    <>
      <NextSeo
        title={course.currentLecture.lessonTitle}
        description={course.currentLecture.lessonDescription}
        openGraph={{
          url: `localhost:3000/courses/${course.slug.current}/${course.currentLecture.lessonSlug.current}`,
          images: [{
            url: urlFor(course.coverImage).url(),
            width: 800,
            height: 600,
            alt: course.title,
          }]
        }}
      />
      <main>
        <section>
          <div className="grid grid-flow-row items-stretch">
            <LessonCurriculum course={course} />
            <LessonBody course={course} />
          </div>
        </section>
      </main>
    </>
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