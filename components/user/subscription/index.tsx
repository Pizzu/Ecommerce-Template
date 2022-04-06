// Libraries
import Stripe from "stripe"
// Types
import type { MouseEventHandler } from "react"
// Components
import Moment from "react-moment"
import { Button, ButtonLink } from "@components/common"

type SubscriptionItemProps = {
  subscription: Stripe.Subscription,
  handleCancelSubscription: MouseEventHandler<HTMLButtonElement>
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({ subscription, handleCancelSubscription }) => {
  return (
    <div key={subscription.id} className="bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h3>Pro Membership Plan</h3>
      </div>
      <div className="grid grid-flow-col gap-6 mb-16">
        <div>
          <p className="caption">Start Subscription</p>
          <Moment className="caption" unix format={"MM/DD/YYYY"}>{subscription.current_period_start}</Moment>
        </div>
        <div>
          <p className="caption">End Subscription</p>
          <Moment className="caption" unix format={"MM/DD/YYYY"}>{subscription.current_period_end}</Moment>
        </div>
      </div>
      {subscription.cancel_at_period_end &&
        <div className="my-6">
          <p className="text-primary">⚠️ Your subscription will automatically be cancelled at the end of the subscription period</p>
        </div>
      }
      <div className="grid grid-flow-col justify-start gap-6">
        {!subscription.cancel_at_period_end &&
          <Button
            onClick={handleCancelSubscription}
            className="bg-primary text-white">
            Cancel Subscription
          </Button>
        }
        <ButtonLink
          href={(subscription.latest_invoice as Stripe.Invoice).hosted_invoice_url as string}
          newTab={true}
          className="bg-secondary text-white">
          Download Invoice
        </ButtonLink>
      </div>
    </div>
  )
}

export default SubscriptionItem