// Libraries
import { useRouter } from "next/router"
// Components
import Link from "next/link"

type ActiveLinkProps = {
  href: string
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href }) => {

  const { pathname } = useRouter()
  let className = ""

  if (pathname === href) {
    className = "nav-link text-black"
  } else {
    className = "nav-link text-black/60 hover:text-black transition-all"
  }

  return (
    <Link href={href} passHref>
      <a className={className}>
        {children}
      </a>
    </Link>
  )
}

export default ActiveLink