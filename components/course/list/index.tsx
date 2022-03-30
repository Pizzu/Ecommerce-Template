// Types
import { OrderCourse } from "@prisma/client"
import type { Course } from "types/"

type CourseListProps = {
  courses: (Course | OrderCourse)[],
  render: Function
}

const CourseList: React.FC<CourseListProps> = ({ courses, render }) => {
  return (
    <>
      {courses.map((course) => render(course))}
    </>
  )
}

export default CourseList