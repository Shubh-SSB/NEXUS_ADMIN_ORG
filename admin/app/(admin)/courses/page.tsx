import { CourseGrid } from "@/components/courses/course-grid"
import { CourseFilters } from "@/components/courses/course-filters"
import { Button } from "@/components/ui/button"
import { Plus, LayoutGrid, List } from "lucide-react"

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage learning content</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-md border">
            <Button variant="ghost" size="sm" className="rounded-r-none">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-l-none border-l">
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      <CourseFilters />
      <CourseGrid />
    </div>
  )
}
