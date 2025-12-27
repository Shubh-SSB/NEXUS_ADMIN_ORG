import { BatchList } from "@/components/batches/batch-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function BatchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Batch Management</h1>
          <p className="text-muted-foreground mt-1">Organize learners into cohorts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Create Batch
        </Button>
      </div>

      <BatchList />
    </div>
  )
}
