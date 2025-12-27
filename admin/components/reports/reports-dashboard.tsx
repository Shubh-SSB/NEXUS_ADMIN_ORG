"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis } from "recharts"

const engagementData = [
  { month: "Jan", engagement: 82 },
  { month: "Feb", engagement: 85 },
  { month: "Mar", engagement: 80 },
  { month: "Apr", engagement: 88 },
  { month: "May", engagement: 91 },
  { month: "Jun", engagement: 87 },
]

const departmentData = [
  { department: "Engineering", learners: 487 },
  { department: "Marketing", learners: 234 },
  { department: "Sales", learners: 189 },
  { department: "HR", learners: 156 },
]

const completionData = [
  { name: "Completed", value: 68, color: "hsl(var(--chart-1))" },
  { name: "In Progress", value: 24, color: "hsl(var(--chart-2))" },
  { name: "Not Started", value: 8, color: "hsl(var(--chart-3))" },
]

const engagementConfig = {
  engagement: {
    label: "Engagement Score",
    color: "hsl(var(--chart-1))",
  },
}

const departmentConfig = {
  learners: {
    label: "Active Learners",
    color: "hsl(var(--chart-2))",
  },
}

export function ReportsDashboard() {
  return (
    <Tabs defaultValue="engagement" className="space-y-6">
      <TabsList>
        <TabsTrigger value="engagement">Learner Engagement</TabsTrigger>
        <TabsTrigger value="performance">Course Effectiveness</TabsTrigger>
        <TabsTrigger value="department">Department Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="engagement" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>Monthly engagement score over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={engagementConfig} className="h-[300px] w-full">
                <LineChart data={engagementData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completion Status</CardTitle>
              <CardDescription>Overall course completion breakdown</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ChartContainer config={{}} className="h-[300px] w-full">
                <PieChart>
                  <Pie
                    data={completionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {completionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="performance" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Performance Metrics</CardTitle>
            <CardDescription>Average completion rates and scores by course</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Performance metrics will be displayed here</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="department" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Participation</CardTitle>
            <CardDescription>Active learners by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={departmentConfig} className="h-[300px] w-full">
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="department" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="learners" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
