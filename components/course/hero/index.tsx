import Image from "next/image"
import { urlFor } from "@lib/sanity"

type CourseHeroProps = {
  title: string,
  description: string
  coverImage: string
}

const CourseHero: React.FC<CourseHeroProps> = ({title, description, coverImage}) => {
  return (
    <section className="bg-primary">
      <div className="container py-[12.63rem]">
        <div className="grid grid-cols-5 gap-8 items-center">
          <div className="col-span-3">
            <div className="max-w-2xl">
              <h1 className="mb-5">{title}</h1>
              <p className="text-white">
                {description}
              </p>
            </div>
          </div>
          <div className="relative col-span-2 w-full h-[25rem] shadow-xl">
          <Image className="object-cover" src={urlFor(coverImage).url()} alt={title} layout="fill" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseHero