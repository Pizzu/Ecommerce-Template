// Libraries
import { useAccount } from "@providers/AccountProvider";
// Types
// Components
import Image from "next/image";
import { Button, ButtonLink } from "@components/common";

type SubscriptionItemProps = {
  iconURL: string,
  price: number
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({ iconURL, price }) => {

  const { isLogged, isLoading, user } = useAccount()

  const handleSubscription = async () => {

  }

  return (
    <div className="bg-white p-8 shadow-xl">
      <div className="text-center">
        <div className="relative w-[5.63rem] h-[5.63rem] m-auto mb-6">
          <Image src={iconURL} alt="star" layout="fill" />
        </div>
        <p className="caption"><span className="text-4xl text-secondary">${price}</span>/month</p>
        <ul className="mt-8 mb-16">
          <li>✅ Unlimited access to PRO courses</li>
          <li>✅ Cancel anytime</li>
          <li>✅ Slack #pro-member invite</li>
        </ul>
        <div>
          {!isLoading && (
            isLogged ?
              user?.proPlan ?
                <p className="caption text-secondary">🎉 You are already a PRO member 🎉</p>
                :
                <Button onClick={handleSubscription} className="bg-primary text-white">Upgrade Now</Button>
              :
              <ButtonLink href="/" className="bg-primary text-white">Login to Upgrade</ButtonLink>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default SubscriptionItem