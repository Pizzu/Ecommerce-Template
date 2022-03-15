import type { CourseSection } from "../../../types"
import { PortableText } from "@portabletext/react";

type CourseBodyProps = {
  body: [CourseSection]
}

const CourseBody: React.FC<CourseBodyProps> = ({ body }) => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-flow-row gap-5 mt-10">
          {body.map((section, index) => (
            <section key={index}>
              <h3 className="mb-2">{section.sectionTitle}</h3>
              <div className="prose max-w-none prose-a:text-nav-link prose-a:uppercase prose-a:text-secondary prose-a:no-underline">
                <PortableText value={section.sectionContent} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CourseBody