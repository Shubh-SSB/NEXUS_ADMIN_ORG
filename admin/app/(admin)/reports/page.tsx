import { ReportsDashboard } from "@/components/reports/reports-dashboard"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Insights and performance metrics</p>
        </div>
        <Button>
          <Download className="h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <ReportsDashboard />
    </div>
  )
}
