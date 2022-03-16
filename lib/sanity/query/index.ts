export const coursesQuery = `*[_type == "course"] {
  _id,
  title,
  type,
  description,
  slug,
  coverImage
}`

export const courseQuery = `*[_type == "course" && slug.current == $slug][0] {
  _id,
  title,
  type,
  description,
  slug,
  coverImage,
  body,
  skills[] {
    _key,
    image,
    title,
    description
  },
  lectures[] {
    _key,
    lessonTitle,
    lessonSlug,
    lessonDescription,
    lessonDuration,
    isLessonFree
  }
}`

export const courseLessonQuery = `*[_type == "course" && slug.current == $slug][0] {
  _id,
  title,
  type,
  description,
  slug,
  lectures[] {
      _key,
      lessonTitle,
      lessonSlug,
      lessonDescription,
      lessonDuration,
      isLessonFree 
  },
  "currentLecture": lectures[lessonSlug.current match $lessonSlug][0] {
      lessonTitle,
      lessonSlug,
      lessonDescription,
      lessonContent,
      lessonDuration,
      lessonVideoUrl,
      isLessonFree 
  },
}`

export const coursesPath = `*[_type == "course" && defined(slug.current)]{
  "params": {
    "slug": slug.current
  }
}`