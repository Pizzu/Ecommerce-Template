// Libraries
// Types
import type { OrderCourse } from "@prisma/client";
// Components
import { ButtonLink } from "@components/common";

type OrderCourseCardProps = {
  orderCourse: OrderCourse
}

const OrderCourseCard: React.FC<OrderCourseCardProps> = ({ orderCourse }) => {
  return (
    <div className="bg-white p-8 shadow-xl">
    <h3 className="mb-8">{orderCourse.title}</h3>
    <div>
      <ButtonLink href={orderCourse.receipt} newTab={true} className="bg-primary text-white">Full Invoice</ButtonLink>
    </div>
  </div>
  )
}

export default OrderCourseCard