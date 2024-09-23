'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { useMediaQuery } from 'react-responsive';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { ChartConfig, ChartContainer, ChartStyle } from '@components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

enum Tag {
  Food = 'Food',
  Transportation = 'Transportation',
  Shopping = 'Shopping',
  Entertainment = 'Entertainment',
  Bills = 'Bills',
  Health = 'Health',
  Travel = 'Travel',
  Other = 'Other',
}

const TAG_DATA: {
  tag: string;
  expense: number;
  transactions: number;
  fill: string;
}[] = [
  {
    tag: Tag.Food,
    expense: 186,
    fill: 'var(--color-food)',
    transactions: 12,
  },
  {
    tag: Tag.Transportation,
    expense: 305,
    fill: 'var(--color-transportation)',
    transactions: 13,
  },
  {
    tag: Tag.Shopping,
    expense: 237,
    fill: 'var(--color-shopping)',
    transactions: 2,
  },
  {
    tag: Tag.Entertainment,
    expense: 173,
    fill: 'var(--color-entertainment)',
    transactions: 3,
  },
  {
    tag: Tag.Bills,
    expense: 209,
    fill: 'var(--color-bills)',
    transactions: 5,
  },
  {
    tag: Tag.Health,
    expense: 150,
    fill: 'var(--color-health)',
    transactions: 2,
  },
  {
    tag: Tag.Travel,
    expense: 120,
    fill: 'var(--color-travel)',
    transactions: 10,
  },
  {
    tag: Tag.Other,
    expense: 90,
    fill: 'var(--color-other)',
    transactions: 19,
  },
];

const chartConfig = {
  food: {
    label: 'Food',
    color: 'hsl(var(--chart-food))',
  },
  transportation: {
    label: 'Transportation',
    color: 'hsl(var(--chart-transportation))',
  },
  shopping: {
    label: 'Shopping',
    color: 'hsl(var(--chart-shopping))',
  },
  entertainment: {
    label: 'Entertainment',
    color: 'hsl(var(--chart-entertainment))',
  },
  bills: {
    label: 'Bills',
    color: 'hsl(var(--chart-bills))',
  },
  health: {
    label: 'Health',
    color: 'hsl(var(--chart-health))',
  },
  travel: {
    label: 'Travel',
    color: 'hsl(var(--chart-travel))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-other))',
  },
} satisfies ChartConfig;

export function ExpenseBreakdownCard() {
  const [activeTag, setActiveTag] = React.useState(TAG_DATA[0].tag);

  const activeIndex = React.useMemo(
    () => TAG_DATA.findIndex(item => item.tag === activeTag),
    [activeTag],
  );

  const handlePieClick = (data: { tag: string }) => {
    setActiveTag(data.tag);
  };

  const tags = React.useMemo(() => TAG_DATA.map(item => item.tag), []);

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const innerRadius = isMobile ? 50 : 80;
  const pieChartLabelOffset = isMobile ? 20 : 26;

  return (
    <Card data-chart='expense-breakdown-card' className='flex flex-col'>
      <ChartStyle id='expense-breakdown-pie-chart' config={chartConfig} />
      <CardHeader className='flex flex-col sm:flex-row items-start space-y-0 pb-0 w-full'>
        <div className='grid gap-1'>
          <CardTitle>Monthly Breakdown</CardTitle>
          <CardDescription>June 2024</CardDescription>
        </div>
        <Select value={activeTag} onValueChange={setActiveTag}>
          <SelectTrigger
            className='ml-auto h-7 sm:h-10 max-w-48 rounded-lg pl-2.5'
            aria-label='Select a value'>
            <SelectValue placeholder='Select Category' />
          </SelectTrigger>
          <SelectContent align='end' className='rounded-xl z-50'>
            {tags.map(key => {
              const config = chartConfig[key.toLowerCase() as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem key={key} value={key} className='rounded-lg [&_span]:flex z-50'>
                  <div className='flex items-center gap-2 text-sm'>
                    <span
                      className='flex h-3 w-3 shrink-0 rounded-sm'
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='flex flex-1 my-auto justify-center py-4'>
        <ChartContainer
          id='expense-breakdown-pie-chart'
          config={chartConfig}
          className='mx-auto items-center aspect-square h-full w-full max-h-[350px] max-w-none'>
          <PieChart>
            <Pie
              data={TAG_DATA}
              dataKey='expense'
              nameKey='tag'
              labelLine={false}
              innerRadius={innerRadius}
              strokeWidth={5}
              activeIndex={activeIndex}
              onClick={handlePieClick}
              label={({ payload, cx, cy, midAngle, index, outerRadius }) => {
                const radian = Math.PI / 180;
                const radius = outerRadius + 20;
                const x = cx + radius * Math.cos(-midAngle * radian);
                const y = cy + radius * Math.sin(-midAngle * radian);
                const cos = Math.cos(-midAngle * radian);
                const textAnchor = cos >= 0 ? 'start' : 'end';

                if (index === activeIndex) {
                  return null;
                }

                return (
                  <g className='hidden sm:block'>
                    <text
                      x={x}
                      y={y - 8}
                      fill='hsla(var(--foreground))'
                      textAnchor={textAnchor}
                      dominantBaseline='central'
                      className={`${index === activeIndex ? 'font-medium' : ''} text-xs`}>
                      {chartConfig[payload.tag.toLowerCase() as keyof typeof chartConfig]?.label}
                    </text>
                    <text
                      x={x}
                      y={y + 8}
                      fill='hsla(var(--muted-foreground))'
                      textAnchor={textAnchor}
                      dominantBaseline='central'
                      className='text-xs'>
                      {`${payload.expense / 10}%`}
                    </text>
                  </g>
                );
              }}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 20} />
                </g>
              )}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    const cy = viewBox.cy ? viewBox.cy + 6 : 6;
                    return (
                      <text x={viewBox.cx} y={cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan
                          x={viewBox.cx}
                          y={(cy || 0) - pieChartLabelOffset}
                          className='fill-foreground font-bold'>
                          {TAG_DATA[activeIndex].tag}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={cy}
                          className='fill-foreground text-2xl sm:text-3xl font-bold'>
                          {`$${TAG_DATA[activeIndex].expense.toLocaleString()}`}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(cy || 0) + pieChartLabelOffset}
                          className='fill-muted-foreground'>
                          Expense
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Exceeding budget by 4.23% this month
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing {TAG_DATA[activeIndex].transactions} transactions
        </div>
      </CardFooter>
    </Card>
  );
}
