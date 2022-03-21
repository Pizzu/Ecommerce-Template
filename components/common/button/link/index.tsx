// Components
import Link from "next/link"

type ButtonLinkProps = {
  href: string,
  className: string
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ children, href, className }) => {
  return (
    <Link href={href} passHref>
      <a className={`nav-link py-2 px-5 ${className}`}>
        {children}
      </a>
    </Link>
  )
}

export default ButtonLink