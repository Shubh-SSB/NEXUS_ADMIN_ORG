import { AssessmentList } from "@/components/assessments/assessment-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AssessmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Assessments & Exams</h1>
          <p className="text-muted-foreground mt-1">Create and manage quizzes and exams</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Create Assessment
        </Button>
      </div>

      <AssessmentList />
    </div>
  )
}
