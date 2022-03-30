// Components
import Link from "next/link"

type ButtonLinkProps = {
  href: string,
  className: string,
  newTab?: boolean
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ children, href, className, newTab }) => {
  return (
    <Link href={href} passHref>
      <a target={newTab ? "_blank" : ""} className={`nav-link py-2 px-5 ${className}`}>
        {children}
      </a>
    </Link>
  )
}

export default ButtonLink