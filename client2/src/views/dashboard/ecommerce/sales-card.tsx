 

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

export function EcommerceSalesCard() {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))"
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))"
    }
  } satisfies ChartConfig;

  const chartData = [
    { month: "January", desktop: 100, mobile: 80 },
    { month: "February", desktop: 150, mobile: 200 },
    { month: "March", desktop: 300, mobile: 120 },
    { month: "April", desktop: 120, mobile: 190 },
    { month: "May", desktop: 80, mobile: 130 },
    { month: "June", desktop: 150, mobile: 140 }
  ];

  return (
    <Card className="md:col-span-4 xl:col-span-3">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-normal">Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">20K</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        <div className="pt-8">
          <ChartContainer className="h-[70px] w-full" config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)"
                }}
                activeDot={{
                  r: 6
                }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
