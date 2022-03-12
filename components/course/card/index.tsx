import { Course } from "types/";
import Image from "next/image"
import { urlFor } from "@lib/sanity"
import { ButtonLink } from "@components/common";

type CourseCardProps = {
  course: Course
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="text-center shadow-xl">
      <div className="relative w-full h-[21.56rem] sm:h-[30rem]">
        <Image className="object-cover" src={urlFor(course.coverImage).url()} alt={course.title} layout="fill" />
      </div>
      <div className="px-8 py-10">
        <p className="caption text-primary mb-3">{course.type}</p>
        <h5 className="mb-2">{course.title}</h5>
        <p className="mb-12">{course.description.substring(0, 75)}...</p>
        <ButtonLink className="bg-primary text-white" href={`/courses/${course.slug}`}>
          Get Started
        </ButtonLink>
      </div>
    </div>
  )
}

export default CourseCard