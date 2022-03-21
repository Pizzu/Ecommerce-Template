// Types
import type { User } from "@prisma/client"

export type UserAccount = {
  user?: User | null
  isLogged?: boolean | null,
  isLoading?: boolean | null
}

export type Course = {
  _id: string
  title: string,
  slug: {
    current: string
  },
  type: string,
  description: string,
  coverImage: string,
  body: [CourseSection],
  lectures: [CourseLesson]
}

export type CourseSection = {
  sectionTitle: string,
  sectionContent: [any]
}

export type CourseLesson = {
  _key: string,
  lessonTitle: string,
  lessonSlug: {
    current: string
  },
  lessonDescription: string,
  lessonDuration: string,
  isLessonFree: string,
  lessonVideoUrl: string,
  lessonContent: [any]
}