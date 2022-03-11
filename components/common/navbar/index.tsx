import Link from "next/link"
import { useAccount } from "@providers/AccountProvider"
import { signIn, signOut } from 'next-auth/react'
import { Button } from "@components/common"

const Navbar: React.FC = () => {

  const { isLogged, isLoading } = useAccount()
  
  return (
    <header className="absolute w-full">
      <div className="container pt-8 pb-0">
        <nav className="flex items-center justify-between">
          <Link href="/" passHref>
            <button className="text-black text-2xl font-bold">Ecommerce Template</button>
          </Link>
          <div className="grid grid-flow-col auto-cols-max gap-7">
            <Link href="/courses" passHref>
              <button className="text-black nav-link">Courses</button>
            </Link>
            <Link href="/dashboard" passHref>
              <button className="text-black nav-link">Dashboard</button>
            </Link>
            <Link href="/profile" passHref>
              <button className="text-black nav-link">Profile</button>
            </Link>
            {!isLogged && !isLoading ?
              <Button onClick={() => signIn("google")} className="bg-black text-white">Log In</Button>
              :
              <Button onClick={() => signOut()} className="bg-black text-white">Logout</Button>
            }
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar