import { sanityClient } from "@lib/sanity";
import type { Course } from "../../../types";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { courseQuery } from "@lib/sanity/query";

const LessonPage: NextPage = () => {
  return (
    <>
    </>
  )
}

export default LessonPage

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