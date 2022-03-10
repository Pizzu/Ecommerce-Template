import type { NextPage, GetServerSideProps } from 'next'
import { getSession } from "next-auth/react"
import { coursesQuery } from '@lib/sanity/query'
import { sanityClient } from '@lib/sanity'
import { CourseList, CourseCard } from '@components/course'
import { Course } from 'types/'
import { Hero } from '@components/common'

const Home: NextPage<{courses: [Course]}> = ({courses}) => {
  return (
    <>
      <Hero />
      <div className="container">
        <div className="mt-10 grid grid-cols-2 gap-24">
          <CourseList courses={courses} render={(course: Course) => <CourseCard key={course._id} course={course} />} />
        </div>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courses = await sanityClient.fetch(coursesQuery)

  return {
    props: { 
      session:  await getSession(context),
      courses 
    },
  }
}