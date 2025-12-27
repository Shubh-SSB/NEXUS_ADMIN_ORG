"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Eye, Copy, BarChart2 } from "lucide-react"

const assessments = [
  {
    id: "1",
    title: "React Fundamentals Final Exam",
    course: "React Fundamentals",
    type: "Exam",
    questions: 50,
    duration: 90,
    attempts: 124,
    avgScore: 78,
  },
  {
    id: "2",
    title: "TypeScript Basics Quiz",
    course: "Advanced TypeScript",
    type: "Quiz",
    questions: 20,
    duration: 30,
    attempts: 89,
    avgScore: 85,
  },
  {
    id: "3",
    title: "Next.js Practical Assessment",
    course: "Next.js for Production",
    type: "Practical",
    questions: 10,
    duration: 120,
    attempts: 45,
    avgScore: 72,
  },
]

export function AssessmentList() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Attempts</TableHead>
              <TableHead>Avg Score</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{assessment.title}</div>
                    <div className="text-sm text-muted-foreground">{assessment.course}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{assessment.type}</Badge>
                </TableCell>
                <TableCell>{assessment.questions}</TableCell>
                <TableCell>{assessment.duration} min</TableCell>
                <TableCell>{assessment.attempts}</TableCell>
                <TableCell>
                  <span className="font-medium">{assessment.avgScore}%</span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
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
                        <BarChart2 className="h-4 w-4" />
                        View Results
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
