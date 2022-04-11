// Libraries
import { useOwnedCourse } from "@hooks/useOwnedCourse"
// Types
import { Course, CourseLesson } from "../../../types";
// Components
import { PortableText } from "@portabletext/react";
import ReactPlayer from "react-player";
import { useAccount } from "@providers/AccountProvider";

type LessonBodyProps = {
  course: Course & { currentLecture: CourseLesson }
}
const LessonBody: React.FC<LessonBodyProps> = ({ course }) => {

  const { isLoading } = useAccount()
  const { isCourseOwned } = useOwnedCourse(course)

  return (
    <article className="container px-8 pr-[8rem] pt-[9rem] w-auto ml-96 md:ml-auto md:px-10">
      {!isLoading &&
        (isCourseOwned || course.currentLecture.isLessonFree ?
          <div>
            <h1>{course.currentLecture.lessonTitle}</h1>
            <p>{course.currentLecture.lessonDescription}</p>
            <div className=" my-10 aspect-video">
              <ReactPlayer url={course.currentLecture.lessonVideoUrl} controls={true} width="100%" height="100%" />
            </div>
            <div className="prose max-w-none prose-headings:mb-5 prose-headings:leading-snug prose-headings:font-normal prose-h1:text-[4.06rem] sm:prose-h1:text-[5.06rem] prose-h2:text-[3.125rem] sm:prose-h2:text-[4.125rem] prose-h3:text-[2.5rem] sm:prose-h3:text-[3.5rem] prose-h4:text-[2.18rem] sm:prose-h4:text-[3.18rem] prose-a:uppercase prose-a:text-secondary prose-a:no-underline">
              <PortableText value={course.currentLecture.lessonContent} />
            </div>
          </div>
          :
          <div className="bg-primary px-4 py-6 ">
            <p>⚠️ In order to access this lesson make sure you are logged in and you have bought the current course or you are a PRO member</p>
          </div>
        )
      }
    </article>
  )
}

export default LessonBody