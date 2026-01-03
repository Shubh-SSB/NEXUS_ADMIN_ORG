import { UserListTable } from "@/components/users/user-list-table";
import { UserFilters } from "@/components/users/user-filters";
import { Button } from "@/components/ui/button";
import { UserPlus, Upload } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage learners</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="cursor-pointer hover:bg-foreground/90"
          >
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
          <Button className="bg-main-bg hover:bg-main-bg/90 cursor-pointer">
            <UserPlus className="h-4 w-4" />
            Create User
          </Button>
        </div>
      </div>

      <UserFilters />
      <UserListTable />
    </div>
  );
}
