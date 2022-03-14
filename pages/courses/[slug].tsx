import { sanityClient } from "@lib/sanity";
import { courseQuery } from "@lib/sanity/query";
import type { Course } from "../../types";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { PortableText } from "@portabletext/react";

const CoursePage: NextPage<{ course: Course }> = ({ course }) => {
  return (
    <section>
      <div className="container">
        <h1>{course.title}</h1>
        <div className="grid grid-flow-row gap-5">
          {course.body.map((section, index) => (
            <div key={index}>
              <h2 className="mb-2">{section.sectionTitle}</h2>
              <div className="grid grid-flow-row gap-5" >
                <PortableText value={section.sectionContent} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoursePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
  const course: Course = await sanityClient.fetch(courseQuery, { slug })


  console.log(slug)
  return {
    props: {
      session: await getSession(context),
      course
    }
  }
}