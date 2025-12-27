import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Clock, TrendingDown } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Subscription Expiring",
    description: "Acme Corp subscription expires in 7 days",
    icon: Clock,
  },
  {
    id: 2,
    type: "info",
    title: "Low Engagement",
    description: "React Basics course has 15% drop in activity",
    icon: TrendingDown,
  },
  {
    id: 3,
    type: "warning",
    title: "Inactive Users",
    description: "42 users haven't logged in for 30+ days",
    icon: AlertCircle,
  },
]

export function AlertsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
        <CardDescription>Important notifications and warnings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon
            return (
              <div key={alert.id} className="flex gap-3">
                <div className="rounded-lg bg-orange-500/10 p-2">
                  <Icon className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
