// Libraries

// Types
import { Course } from "../../../types";
// Components
import Link from "next/link";

type LessonCurriculumProps = {
  course: Course
}

const LessonCurriculum: React.FC<LessonCurriculumProps> = ({ course }) => {
  return (
    <aside className="bg-grey-light h-screen fixed w-96 pt-[6.1rem] overflow-y-scroll md:static md:container md:h-auto md:w-full md:bg-inherit md:order-2">
      <div className="grid grid-flow-row shadow-lg">
        {course.lectures.map((lesson) => (
          <Link key={lesson._key} href={`/courses/${course.slug.current}/${lesson.lessonSlug.current}`} passHref>
            <div className="px-6 py-4 flex justify-between items-center bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-grey-light duration-300 cursor-pointer">
              <div>
                <h6 className="text-black">{lesson.lessonTitle}</h6>
                <p className="opacity-60">{lesson.lessonDescription}</p>
              </div>
              <div>
                {lesson.isLessonFree && <p className="text-base bg-green-400 text-white px-1 mb-2">Free</p>}
                <p className="text-base bg-grey-light text-black px-1">{lesson.lessonDuration}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default LessonCurriculum