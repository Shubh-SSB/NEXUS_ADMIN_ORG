import { SubscriptionOverview } from "@/components/billing/subscription-overview"
import { UsageLimits } from "@/components/billing/usage-limits"
import { InvoiceHistory } from "@/components/billing/invoice-history"

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and billing details</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SubscriptionOverview />
        <UsageLimits />
      </div>

      <InvoiceHistory />
    </div>
  )
}
