import { UserListTable } from "@/components/users/user-list-table"
import { UserFilters } from "@/components/users/user-filters"
import { Button } from "@/components/ui/button"
import { UserPlus, Upload } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage learners, trainers, and administrators</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
          <Button>
            <UserPlus className="h-4 w-4" />
            Invite User
          </Button>
        </div>
      </div>

      <UserFilters />
      <UserListTable />
    </div>
  )
}
