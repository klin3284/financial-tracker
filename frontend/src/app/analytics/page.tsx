'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import Header from '@components/layout/header';
import MonthlyComparisonBreakdown from '@components/cards/areaChartCard';
import SpendingChange from '@components/cards/spendingChangeCard';
import ProgressCard from '@components/cards/progressCard';

export default function Analytics() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:gap-8 lg:grid-cols-2'>
          <ProgressCard />

          <Card>
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'></div>
            </CardContent>
          </Card>
        </div>
        <div className='w-full grid gap-4 md:gap-8 lg:grid-cols-2'>
          <MonthlyComparisonBreakdown />
          <SpendingChange />
        </div>
      </main>
    </div>
  );
}
