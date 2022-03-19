import getStripe from "@lib/stripe"
import { Button } from "@components/common"
import type { Course } from "../../../types"
import { useAccount } from "@providers/AccountProvider"

type CoursePaymentProps = {
  course: Course
}

const CoursePayment: React.FC<CoursePaymentProps> = ({ course }) => {
  const { user, isLogged } = useAccount()

  return (
    <section>
      <div className="container">
        <Button className="bg-primary text-white">Buy at $19.00</Button>
      </div>
    </section>
  )
}

export default CoursePayment