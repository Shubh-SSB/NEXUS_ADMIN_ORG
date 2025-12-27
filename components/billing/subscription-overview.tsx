"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function SubscriptionOverview() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your subscription details</CardDescription>
          </div>
          <Badge className="bg-green-600">Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold">Enterprise</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">$499</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Unlimited learners</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Unlimited courses</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Advanced analytics</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Priority support</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Custom branding</span>
          </div>
        </div>

        <div className="space-y-2 rounded-lg border p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Billing cycle</span>
            <span className="font-medium">Monthly</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next billing date</span>
            <span className="font-medium">Feb 1, 2025</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 bg-transparent">
            Change Plan
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
