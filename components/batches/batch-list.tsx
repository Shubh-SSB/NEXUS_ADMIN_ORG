"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Eye, Users, Calendar } from "lucide-react"
import { mockBatches } from "@/lib/mock-data"

export function BatchList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {mockBatches.map((batch) => (
        <Card key={batch.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-balance">{batch.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4" />
                    Edit Batch
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Delete Batch</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                <Users className="h-3 w-3" />
                {batch.learnerCount} learners
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Calendar className="h-3 w-3" />
                {batch.startDate}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{batch.progress}%</span>
              </div>
              <Progress value={batch.progress} />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                View Learners
              </Button>
              <Button className="flex-1" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
