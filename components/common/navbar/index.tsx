import Link from "next/link"
import { useAccount } from "@providers/AccountProvider"
import { signIn, signOut } from 'next-auth/react'

const Navbar: React.FC = () => {

  const { isLogged } = useAccount()

  return (
    <header className="absolute w-full">
      <div className="container pt-8 pb-0">
        <nav className="flex items-center justify-between">
          <Link href="/" passHref>
            <button className="text-black text-xl font-bold">Ecommerce Template</button>
          </Link>
          <div className="grid grid-flow-col auto-cols-max gap-7">
            <Link href="/dashboard" passHref>
              <button className="text-black text-lg font-bold">Dashboard</button>
            </Link>
            <Link href="/checkout" passHref>
              <button className="text-black text-lg font-bold">Checkout</button>
            </Link>
            {!isLogged ?
              <button onClick={() => signIn("google")} className="bg-black px-6 py-3 text-white text-lg">Log In</button>
              :
              <button onClick={() => signOut()} className="bg-black px-6 py-3 text-white text-lg">Logout</button>
            }
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar