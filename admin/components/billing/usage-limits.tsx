"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const usage = [
  {
    name: "Active Learners",
    current: 2847,
    limit: null,
    percentage: 0,
    unlimited: true,
  },
  {
    name: "Courses Published",
    current: 42,
    limit: null,
    percentage: 0,
    unlimited: true,
  },
  {
    name: "Storage Used",
    current: 45.2,
    limit: 100,
    percentage: 45,
    unit: "GB",
  },
  {
    name: "API Calls",
    current: 87500,
    limit: 100000,
    percentage: 88,
    unit: "",
  },
]

export function UsageLimits() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage & Limits</CardTitle>
        <CardDescription>Current usage against your plan limits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {usage.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.name}</span>
              {item.unlimited ? (
                <span className="text-muted-foreground">{item.current.toLocaleString()} / Unlimited</span>
              ) : (
                <span className="text-muted-foreground">
                  {item.current.toLocaleString()} {item.unit} / {item.limit?.toLocaleString()} {item.unit}
                </span>
              )}
            </div>
            {!item.unlimited && (
              <Progress value={item.percentage} className={item.percentage > 80 ? "[&>div]:bg-orange-500" : ""} />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
