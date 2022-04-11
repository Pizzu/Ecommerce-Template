// Components
import { Authentication } from "@components/user"

const Hero: React.FC = () => {
  return (
    <section className="bg-primary">
      <div className="container py-[12.63rem]">
        <div className="grid grid-cols-5 gap-8 items-center sm:grid-cols-1 sm:gap-20">
          <div className="col-span-3 sm:col-span-1">
            <div className="max-w-2xl sm:max-w-full sm:text-center">
              <h1 className="mb-5">Grow your career as a developer</h1>
              <p className="text-white">
                Learn programming and web development the easy way!<br />
                Get access to all of my courses. This is a gateway drug for developers
                who want to build  awesome web & mobile apps.
              </p>
            </div>
          </div>
          <Authentication />
        </div>
      </div>
    </section>
  )
}

export default Hero