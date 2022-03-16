import { sanityClient } from "@lib/sanity";
import type { Course, CourseLesson } from "../../../types";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { courseLessonQuery } from "@lib/sanity/query";
import { PortableText } from "@portabletext/react";
import ReactPlayer from "react-player";

const LessonPage: NextPage<{ course: Course & { currentLecture: CourseLesson } }> = ({ course }) => {
  return (
    <section>
      <div className="container">
        <h1>{course.currentLecture.lessonTitle}</h1>
        <p>{course.currentLecture.lessonDescription}</p>
        <ReactPlayer url={course.currentLecture.lessonVideoUrl} controls={true} width="100%" height="30rem"/>
        <div className="prose max-w-none prose-headings:leading-snug prose-headings:font-normal 
        prose-h1:text-[4.06rem] prose-h2:text-[3.125rem] prose-h3:text-[2.5rem] prose-h4:text-[2.18rem] 
        prose-a:text-nav-link prose-a:uppercase prose-a:text-secondary prose-a:no-underline">
          <PortableText value={course.currentLecture.lessonContent} />
        </div>
      </div>
    </section>
  )
}

export default LessonPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug, lessonSlug } = context.query
  const course: Course = await sanityClient.fetch(courseLessonQuery, { slug, lessonSlug })
  console.log(course)
  return {
    props: {
      session: await getSession(context),
      course
    }
  }
}