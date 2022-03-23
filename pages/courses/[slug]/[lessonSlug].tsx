// Libraries
import { sanityClient } from "@lib/sanity";
import { getSession } from "next-auth/react";
import { courseLessonQuery } from "@lib/sanity/query";
// Types
import type { GetServerSideProps, NextPage } from "next";
import type { Course, CourseLesson } from "../../../types";
// Components
import Link from "next/link";
import ReactPlayer from "react-player";
import { PortableText } from "@portabletext/react";
import { useOwnedCourse } from "@hooks/useOwnedCourse";

const LessonPage: NextPage<{ course: Course & { currentLecture: CourseLesson } }> = ({ course }) => {

  const { isCourseOwned } = useOwnedCourse(course)

  return (
    <section>
      <div className="grid grid-flow-row items-stretch">
        <aside className="bg-grey-light h-screen fixed w-96 pt-[6.1rem] overflow-y-scroll md:static md:container md:h-auto md:w-full md:bg-inherit md:order-2">
          <div className="grid grid-flow-row shadow-lg">
            {course.lectures.map((lesson) => (
              <Link key={lesson._key} href={`/courses/${course.slug.current}/${lesson.lessonSlug.current}`} passHref>
                <div className="px-6 py-4 flex justify-between items-center bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-grey-light duration-300 cursor-pointer">
                  <div>
                    <h6 className="text-black">{lesson.lessonTitle}</h6>
                    <p className="opacity-60">{lesson.lessonDescription}</p>
                  </div>
                  <div>
                    {lesson.isLessonFree && <p className="text-base bg-green-400 text-white px-1 mb-2">Free</p>}
                    <p className="text-base bg-grey-light text-black px-1">{lesson.lessonDuration}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
        <article className="container px-8 pr-[8rem] pt-[9rem] w-auto ml-96 md:ml-auto md:px-10">
          {isCourseOwned || course.currentLecture.isLessonFree ?
            <div>
              <h1>{course.currentLecture.lessonTitle}</h1>
              <p>{course.currentLecture.lessonDescription}</p>
              <div className="aspect-video">
                <ReactPlayer url={course.currentLecture.lessonVideoUrl} controls={true} width="100%" height="100%" />
              </div>
              <div className="prose max-w-none prose-headings:leading-snug prose-headings:font-normal prose-h1:text-[4.06rem] prose-h2:text-[3.125rem] prose-h3:text-[2.5rem] prose-h4:text-[2.18rem] prose-a:text-nav-link prose-a:uppercase prose-a:text-secondary prose-a:no-underline">
                <PortableText value={course.currentLecture.lessonContent} />
              </div>
            </div>
            :
            <p>Buy the course</p>
          }
        </article>
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