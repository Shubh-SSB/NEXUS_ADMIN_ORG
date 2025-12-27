import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    user: "John Doe",
    email: "john.doe@acme.com",
    action: "Completed",
    course: "React Fundamentals",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "completion",
  },
  {
    id: 2,
    user: "Sarah Wilson",
    email: "sarah.wilson@acme.com",
    action: "Enrolled in",
    course: "Advanced TypeScript",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "enrollment",
  },
  {
    id: 3,
    user: "Michael Brown",
    email: "michael.brown@acme.com",
    action: "Started",
    course: "Next.js for Production",
    time: "6 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "start",
  },
  {
    id: 4,
    user: "Emily Davis",
    email: "emily.davis@acme.com",
    action: "Completed",
    course: "UI/UX Design Principles",
    time: "8 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "completion",
  },
  {
    id: 5,
    user: "Alex Johnson",
    email: "alex.johnson@acme.com",
    action: "Enrolled in",
    course: "Python for Data Science",
    time: "10 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "enrollment",
  },
]

export function RecentActivityTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest learner activities across all courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                <AvatarFallback>{activity.user.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{activity.user}</p>
                  <Badge variant="secondary" className="text-xs">
                    {activity.action}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.course}</p>
              </div>
              <div className="text-sm text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
