import type { NextPage, GetServerSideProps } from 'next'
import { getSession } from "next-auth/react"
import { coursesQuery } from '@lib/sanity/query'
import { sanityClient } from '@lib/sanity'
import type { Course } from 'types/'
import { Hero } from '@components/common'
import { MarketplaceStore } from '@components/marketplace'

const Home: NextPage<{ courses: [Course] }> = ({ courses }) => {
  return (
    <>
      <Hero />
      <MarketplaceStore courses={courses} />
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courses = await sanityClient.fetch(coursesQuery)

  return {
    props: {
      session: await getSession(context),
      courses
    },
  }
}

