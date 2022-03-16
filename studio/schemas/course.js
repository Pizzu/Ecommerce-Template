const courseSchema = {
  name: "course",
  title: "Course",
  type: "document",
  fields: [{
      name: "title",
      title: "Course title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "type",
      title: "Type",
      type: "string"
    },
    {
      name: "description",
      title: "Course description",
      type: "text"
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "body",
      title: "Course Body",
      type: 'array',
      of: [
        {
          name: "courseSection",
          title: "Course Section",
          type: 'object',
          fields: [
            {name: "sectionTitle", title: "Section Title", type: "string"},
            {name: "sectionContent", title: "Section Content", type: "array", of: [{type: "block"}]}
          ]
        },
      ]
    }, 
    {
      name: "lectures",
      title: "Course Lectures",
      type: "array",
      of: [
        {
          name: "lesson",
          title: "Lesson",
          type: "object",
          fields: [
            {name: "lessonTitle", title: "Lesson Title", type: "string"},
            {name: "lessonSlug", title: "Lesson Slug", type: "slug", options: {source: "lessonTitle", maxLength: 96}},
            {name: "lessonDescription", title: "Lesson Description", type: "text"},
            {name: "lessonDuration", title: "Lesson Duration", type: "string"},
            {name: "isLessonFree", title: "Is Lesson Free", type: "boolean", initialValue: false},
            {name: "lessonVideoUrl", title: "Lesson Video URL", type: "url"},
            {name: "lessonContent", title: "Lesson Content", type: "array", of: [{type: "block"}]}
          ]
        }
      ]
    }
  ]
}

export default courseSchema