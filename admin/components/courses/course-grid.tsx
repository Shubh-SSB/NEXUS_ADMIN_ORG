"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Edit, Eye, Copy, Trash2, Users } from "lucide-react"
import { mockCourses } from "@/lib/mock-data"

export function CourseGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockCourses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-primary/5" />
          <CardHeader>
            <div className="flex items-start justify-between">
              <Badge variant={course.status === "published" ? "default" : "secondary"} className="capitalize">
                {course.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle className="line-clamp-2 text-balance">{course.title}</CardTitle>
            <CardDescription className="line-clamp-2 text-balance">{course.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{course.enrolledCount} enrolled</span>
              </div>
              <span className="font-medium">{course.completionRate}% complete</span>
            </div>
            <Progress value={course.completionRate} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
