'use client';

import { Area, XAxis, CartesianGrid, Line, YAxis, ComposedChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@components/ui/chart';

interface DailyExpense {
  day: number;
  thisMonth: number;
  lastMonth: number;
  budget: number;
}

const DAILY_EXPENSES = [
  { day: 1, thisMonth: 21, lastMonth: 16, budget: 4000 },
  { day: 2, thisMonth: 85, lastMonth: 67, budget: 4000 },
  { day: 3, thisMonth: 192, lastMonth: 151, budget: 4000 },
  { day: 4, thisMonth: 337, lastMonth: 266, budget: 4000 },
  { day: 5, thisMonth: 516, lastMonth: 1266, budget: 4000 },
  { day: 6, thisMonth: 722, lastMonth: 1266, budget: 4000 },
  { day: 7, thisMonth: 512, lastMonth: 820, budget: 4000 },
  { day: 8, thisMonth: 526, lastMonth: 320, budget: 4000 },
  { day: 9, thisMonth: 526, lastMonth: 210, budget: 4000 },
  { day: 10, thisMonth: 626, lastMonth: 520, budget: 4000 },
  { day: 11, thisMonth: 626, lastMonth: 523, budget: 4000 },
  { day: 12, thisMonth: 722, lastMonth: 1673, budget: 4000 },
  { day: 13, thisMonth: 1317, lastMonth: 1831, budget: 4000 },
  { day: 14, thisMonth: 1500, lastMonth: 1971, budget: 4000 },
  { day: 15, thisMonth: 1673, lastMonth: 2093, budget: 4000 },
  { day: 16, thisMonth: 626, lastMonth: 1900, budget: 4000 },
  { day: 17, thisMonth: 626, lastMonth: 2910, budget: 4000 },
  { day: 18, thisMonth: 626, lastMonth: 3210, budget: 4000 },
  { day: 19, thisMonth: 626, lastMonth: 3210, budget: 4000 },
  { day: 20, thisMonth: 1502, lastMonth: 3210, budget: 4000 },
  { day: 21, thisMonth: 3027, lastMonth: 2923, budget: 4000 },
  { day: 22, thisMonth: 3004, lastMonth: 2400, budget: 4000 },
  { day: 23, thisMonth: 2962, lastMonth: 2120, budget: 4000 },
  { day: 24, thisMonth: 2904, lastMonth: 1960, budget: 4000 },
  { day: 25, thisMonth: 2832, lastMonth: 3200, budget: 4000 },
  { day: 26, thisMonth: 2751, lastMonth: 2801, budget: 4000 },
  { day: 27, thisMonth: 2665, lastMonth: 2801, budget: 4000 },
  { day: 28, thisMonth: 2578, lastMonth: 2732, budget: 4000 },
  { day: 29, thisMonth: 2494, lastMonth: 2122, budget: 4000 },
  { day: 30, thisMonth: 4213, lastMonth: 2122, budget: 4000 },
];

const chartConfig = {
  thisMonth: {
    label: 'This Month',
    color: 'hsl(var(--chart-1))',
  },
  lastMonth: {
    label: 'Last Month',
    color: 'hsl(var(--chart-2))',
  },
  budget: {
    label: 'Budget Line',
    color: 'hsl(var(--foreground))',
  },
} satisfies ChartConfig;

const MonthlyComparisonBreakdown = () => {
  const dailyExpenses: DailyExpense[] = DAILY_EXPENSES;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expense Comparison</CardTitle>
        <CardDescription>This month vs. last month with budget line</CardDescription>
      </CardHeader>
      <CardContent className='flex my-auto items-start w-full justify-start pl-0'>
        <ChartContainer
          id='expense-breakdown-pie-chart'
          config={chartConfig}
          className='items-start aspect-square h-full w-full max-h-[350px] max-w-none'>
          <ComposedChart accessibilityLayer data={dailyExpenses} margin={{ right: 2, left: 2 }}>
            <CartesianGrid vertical={false} />
            <YAxis dataKey='thisMonth' />
            <XAxis dataKey='day' tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />
            <Area
              type='natural'
              dataKey='thisMonth'
              stroke='var(--color-thisMonth)'
              fill='var(--color-thisMonth)'
              fillOpacity={0.5}
              name='This Month'
            />
            <Area
              type='natural'
              dataKey='lastMonth'
              stroke='var(--color-lastMonth)'
              fill='var(--color-lastMonth)'
              fillOpacity={0.5}
              name='Last Month'
            />
            <Line
              type='natural'
              strokeDasharray='15 15'
              dot={false}
              dataKey='budget'
              stroke='var(--color-budget)'
              name='Budget Line'
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyComparisonBreakdown;
