import { Course } from "types/"

type CourseListProps = {
  courses: [Course],
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