const courseSchema = {
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    {
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
      name: "lectures",
      title: "Course Lectures",
      type: "array",
      of: [{ type: "string" }]
    }
  ]
}

export default courseSchema