import type { CourseChapter } from "../../../types"
import Link from "next/link"

type CourseCurriculumProps = {
  lectures: [CourseChapter],
  courseSlug: {
    current: string
  }
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ lectures, courseSlug }) => {
  return (
    <section>
      <div className="container">
        <h2 className="text-primary text-center mb-6">Course Chapters</h2>
        <div className="mx-auto max-w-4xl grid grid-flow-row gap-10">
          {lectures.map((courseChapter) => (
            <div key={courseChapter._key}>
              <h3 className="text-secondary caption mb-5">{courseChapter.chapterTitle}</h3>
              <div className="grid grid-flow-row shadow-lg">
                {courseChapter.chapterLessons.map((lesson) => (
                  <Link key={lesson._key} href={`/courses/${courseSlug.current}/${lesson.lessonSlug.current}`} passHref>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CourseCurriculum