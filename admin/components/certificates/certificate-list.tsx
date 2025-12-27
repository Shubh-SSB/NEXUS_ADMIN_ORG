"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Eye, Edit } from "lucide-react"

const certificates = [
  {
    id: "1",
    name: "React Fundamentals Certificate",
    course: "React Fundamentals",
    issued: 124,
    autoIssue: true,
  },
  {
    id: "2",
    name: "TypeScript Expert Certificate",
    course: "Advanced TypeScript",
    issued: 89,
    autoIssue: true,
  },
  {
    id: "3",
    name: "Next.js Certification",
    course: "Next.js for Production",
    issued: 45,
    autoIssue: false,
  },
]

export function CertificateList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {certificates.map((cert) => (
        <Card key={cert.id}>
          <CardHeader>
            <div className="mb-4 flex aspect-video items-center justify-center rounded-lg border-2 border-dashed bg-muted">
              <Award className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-balance">{cert.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{cert.course}</span>
              {cert.autoIssue && <Badge variant="secondary">Auto-issue</Badge>}
            </div>

            <div className="text-sm">
              <span className="text-muted-foreground">Issued: </span>
              <span className="font-medium">{cert.issued} certificates</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
