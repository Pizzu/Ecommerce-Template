import { MouseEventHandler } from "react"

type ButtonProps = {
  className: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  isDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, isDisabled=false }) => {
  return (
    <button onClick={onClick} disabled={isDisabled} className={`nav-link py-2 px-5 ${className}`}>
      {children}
    </button>
  )
}

export default Button