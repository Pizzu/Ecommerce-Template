import { Course } from "types/";

type CourseCardProps = {
  course: Course
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <>
      <h1 className="text-lg text-red-500">{course.title}</h1>
    </>
  )
}

export default CourseCard