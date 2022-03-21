// Libraries
import { getSession } from "next-auth/react"
import { coursesQuery } from '@lib/sanity/query'
import { sanityClient } from '@lib/sanity'
// Types
import type { NextPage, GetServerSideProps } from 'next'
import type { Course } from 'types/'
// Components
import { Hero } from '@components/common'
import { MarketplaceStore } from '@components/marketplace'

const Home: NextPage<{ courses: [Course] }> = ({ courses }) => {
  return (
    <main>
      <Hero />
      <MarketplaceStore courses={courses} />
    </main>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courses: [Course] = await sanityClient.fetch(coursesQuery)

  return {
    props: {
      session: await getSession(context),
      courses
    },
  }
}

