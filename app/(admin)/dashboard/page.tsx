import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { CourseProgressChart } from "@/components/dashboard/course-progress-chart"
import { LearnerActivityChart } from "@/components/dashboard/learner-activity-chart"
import { RecentActivityTable } from "@/components/dashboard/recent-activity-table"
import { AlertsList } from "@/components/dashboard/alerts-list"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your learning management system</p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <CourseProgressChart />
        <LearnerActivityChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivityTable />
        </div>
        <AlertsList />
      </div>
    </div>
  )
}
