import { TrainerGrid } from "@/components/trainers/trainer-grid"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default function TrainersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Trainer Management</h1>
          <p className="text-muted-foreground mt-1">Manage trainers and instructors</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4" />
          Add Trainer
        </Button>
      </div>

      <TrainerGrid />
    </div>
  )
}
