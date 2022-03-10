import { useAccount } from '@providers/AccountProvider'
import type { NextPage, GetServerSideProps } from 'next'
import { getSession } from "next-auth/react"
import { coursesQuery } from '@lib/sanity/query'
import { sanityClient } from '@lib/sanity'
import { CourseList, CourseCard } from '@components/course'
import { Course } from 'types/'

const Home: NextPage<{courses: [Course]}> = ({courses}) => {

  const { isLogged, user } = useAccount()

  return (
    <section>
      <div className="container">
        <h1 className="mb-4 text-primary font-semibold">Welcome to Prisma</h1>
        <p className="caption">Electron JS</p>
        <p className="mb-4 text-secondary">Current User: {isLogged && user?.email }</p>
        <div className="mt-10 grid grid-cols-2 gap-24">
          <CourseList courses={courses} render={(course: Course) => <CourseCard key={course._id} course={course} />} />
        </div>
      </div>
    </section>
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