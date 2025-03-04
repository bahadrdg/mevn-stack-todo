 

import * as React from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { CardOptionsMenu } from "@/components/CardActionMenus";

const chartData = [
  { source: "mentoring", leads: 65.2, fill: "var(--color-mentoring)" },
  { source: "organization", leads: 25, fill: "var(--color-organization)" },
  { source: "planning", leads: 9.8, fill: "var(--color-planning)" }
];

const chartConfig = {
  mentoring: {
    label: "Mentoring",
    color: "hsl(var(--chart-1))"
  },
  organization: {
    label: "Organization",
    color: "hsl(var(--chart-2))"
  },
  planning: {
    label: "Planning",
    color: "hsl(var(--chart-3))"
  }
} satisfies ChartConfig;

type ChartConfigKeys = keyof typeof chartConfig;

export function MostActivityCard() {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>Most Activity</CardTitle>
        <CardOptionsMenu />
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="leads"
              nameKey="source"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
        <div className="flex justify-around">
          {chartData.map((item) => (
            <div className="flex flex-col" key={item.source}>
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="block h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: chartConfig[item.source as ChartConfigKeys]?.color
                  }}></span>
                <div>{chartConfig[item.source as ChartConfigKeys]?.label}</div>
              </div>
              <div className="text-center text-xl font-bold">{item.leads}%</div>
            </div>
          ))}
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
}
