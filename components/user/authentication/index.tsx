// Libraries
import { useAccount } from "@providers/AccountProvider"
// Components
import Image from "next/image"
import { Button, ButtonLink } from "@components/common"
import { signIn } from "next-auth/react"

const Authentication: React.FC = () => {

  const { isLogged, user, isLoading } = useAccount()

  return (
    <div className="col-span-2 bg-white p-8 shadow-xl sm:col-span-1">
      {isLogged ?
        <div className={`text-center opacity-0 translate-y-2 ${!isLoading && "opacity-100 translate-y-0"} transition-all duration-300`}>
          <div className="relative w-[3.63rem] h-[3.63rem] m-auto mb-6">
            <Image src="/star.svg" alt="star" layout="fill" />
          </div>
          <p className="caption mb-6">Welcome {user?.name}, you are already logged in</p>
          <p className="bg-grey-light inline-block px-3 py-1 mb-16">{user?.email}</p>
          <div>
            <ButtonLink href="/dashboard" className="bg-primary text-white">Dashboard</ButtonLink>
          </div>
        </div>
        :
        <div className={`text-center opacity-0 translate-y-2 ${!isLoading && "opacity-100 translate-y-0"} transition-all duration-300`}>
          <div className="relative w-[3.63rem] h-[3.63rem] m-auto mb-6">
            <Image src="/login.svg" alt="star" layout="fill" />
          </div>
          <p className="caption mb-16">Welcome! Sign in now to access your courses</p>
          <div className="grid justify-center gap-5">
            <Button onClick={() => signIn("google")} className="bg-primary text-white">
              <div className="flex items-center">
                <div className="relative w-[2.06rem] h-[2.06rem] mr-5">
                  <Image src="/google.svg" alt="google_icon" layout="fill" />
                </div>
                Google Sign In
              </div>
            </Button>
            <Button onClick={() => signIn("github")} className="bg-primary text-white">
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
  )
}

export default Authentication