// Types
import type { Course } from "../../../types"
// Components
import { CourseList, CourseCard } from "@components/course"
import Link from "next/link"

const MarketplaceStore: React.FC<{ courses: [Course] }> = ({ courses }) => {
  return (
    <section>
      <div className="container">
        <div className="text-center max-w-4xl m-auto mb-24">
          <h2 className="text-primary mb-5">Check out all my courses</h2>
          <p className="mb-10">
            The first few lessons of each course are free, so just dive in. When you reach a paid module, 
            you will be asked to pay for a single course or upgrade to a 
            PRO membership which will give you access to all of my courses.
          </p>
          <Link href={"/membership"} passHref>
            <a className="caption text-secondary">Become a pro member</a>  
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-24 sm:grid-cols-1">
          <CourseList courses={courses} render={(course: Course) => <CourseCard key={course._id} course={course} />} />
        </div>
      </div>
    </section>
  )
}

export default MarketplaceStore