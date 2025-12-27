"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", progress: 65 },
  { month: "Feb", progress: 68 },
  { month: "Mar", progress: 72 },
  { month: "Apr", progress: 75 },
  { month: "May", progress: 78 },
  { month: "Jun", progress: 82 },
]

const chartConfig = {
  progress: {
    label: "Progress %",
    color: "hsl(var(--chart-1))",
  },
} satisfies import("@/components/ui/chart").ChartConfig

export function CourseProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress Over Time</CardTitle>
        <CardDescription>Average completion rate across all courses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="hsl(var(--chart-1))"
              fill="url(#colorProgress)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
