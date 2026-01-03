"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", active: 487 },
  { day: "Tue", active: 523 },
  { day: "Wed", active: 612 },
  { day: "Thu", active: 578 },
  { day: "Fri", active: 445 },
  { day: "Sat", active: 289 },
  { day: "Sun", active: 195 },
];

const chartConfig = {
  active: {
    label: "Active Learners",
    color: "hsl(var(--chart-2))",
  },
} satisfies import("@/components/ui/chart").ChartConfig;

export function LearnerActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learner Activity</CardTitle>
        <CardDescription>Active learners by day this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="day" className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="active" fill="#7E2727" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
