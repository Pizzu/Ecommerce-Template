import { useAccount } from "@providers/AccountProvider"
import Image from "next/image"
import { Button, ButtonLink } from "@components/common"

const Hero: React.FC = () => {

  const { isLogged, user, isLoading } = useAccount()

  return (
    <section className="bg-primary">
      <div className="container py-[12.63rem]">
        <div className="grid grid-cols-5 gap-8 items-center">
          <div className="col-span-3">
            <div className="max-w-2xl">
              <h1 className="mb-5">Grow your career as a developer</h1>
              <p className="text-white">
                Learn programming and web development the easy way!<br />
                Get access to all of my courses. This is a gateway drug for developers
                who want to build  awesome web & mobile apps.
              </p>
            </div>
          </div>
          <div className="col-span-2 bg-white p-8">
            {isLogged ?
              <div className={`text-center opacity-0 translate-y-2 ${!isLoading && "opacity-100 translate-y-0"} transition-all duration-300`}>
                <div className="relative w-[3.63rem] h-[3.63rem] m-auto mb-6">
                  <Image src="/star.svg" alt="star" layout="fill" />
                </div>
                <p className="caption mb-6">Welcome {user?.name}, you are already logged in</p>
                <p className="bg-grey-light inline-block px-3 py-1 mb-16">{user?.email}</p>
                <ButtonLink href="/dashboard" className="bg-primary text-white">Dashboard</ButtonLink>
              </div>
              :
              <div className={`text-center opacity-0 translate-y-2 ${!isLoading && "opacity-100 translate-y-0"} transition-all duration-300`}>
                <div className="relative w-[3.63rem] h-[3.63rem] m-auto mb-6">
                  <Image src="/login.svg" alt="star" layout="fill" />
                </div>
                <p className="caption mb-16">Welcome! Sign in now to access your courses</p>
                <div className="grid justify-center gap-5">
                  <Button className="bg-primary text-white">
                    <div className="flex items-center">
                      <div className="relative w-[2.06rem] h-[2.06rem] mr-5">
                        <Image src="/google.svg" alt="google_icon" layout="fill" />
                      </div>
                      Google Sign In
                    </div>
                  </Button>
                  <Button className="bg-primary text-white">
                    <div className="flex items-center">
                      <div className="relative w-[2.06rem] h-[2.06rem] mr-5">
                        <Image src="/github.svg" alt="github_icon" layout="fill" />
                      </div>
                      Github Sign In
                    </div>
                  </Button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero