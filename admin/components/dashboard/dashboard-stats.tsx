import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, TrendingUp, Activity } from "lucide-react"

const stats = [
  {
    title: "Total Learners",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "from last month",
  },
  {
    title: "Active Courses",
    value: "42",
    change: "+3",
    trend: "up",
    icon: BookOpen,
    description: "new this month",
  },
  {
    title: "Completion Rate",
    value: "78.4%",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    description: "vs last quarter",
  },
  {
    title: "Engagement Score",
    value: "85.2",
    change: "-2.1",
    trend: "down",
    icon: Activity,
    description: "weekly average",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardContent className="flex items-start justify-between p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
