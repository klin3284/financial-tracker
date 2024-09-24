import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import { Tag } from '@lib/types';

const ANALYTICS_DATA = Object.values(Tag).map(category => ({
  category,
  current: Math.floor(Math.random() * 500) + 100,
  previous: Math.floor(Math.random() * 500) + 100,
  transactions: Math.floor(Math.random() * 20) + 1,
  budget: Math.floor(Math.random() * 600) + 200,
}));

const SpendingChange = () => (
  <Card>
    <CardHeader>
      <CardTitle>Spending Changes</CardTitle>
      <CardDescription>Compare your current spending to the previous month</CardDescription>
    </CardHeader>
    <CardContent>
      <div className='grid grid-cols-2 2xl:grid-cols-4 gap-4'>
        {ANALYTICS_DATA.map(item => (
          <Card key={item.category}>
            <CardHeader className='flex flex-col items-start space-y-0 pb-1 px-4 lg:px-6'>
              <CardTitle className='text-base font-bold'>{item.category}</CardTitle>
              <p className='text-xs text-muted-foreground'>{item.transactions} transactions</p>
            </CardHeader>
            <CardContent className='px-4 lg:px-6'>
              <div className='flex items-center justify-between'>
                <div className='text-lg font-bold'>${item.current}</div>
                <div className='flex items-center'>
                  {item.current > item.previous ? (
                    <ArrowUpIcon className='h-3 w-3 text-red-500 mr-1' />
                  ) : (
                    <ArrowDownIcon className='h-3 w-3 text-green-500 mr-1' />
                  )}
                  <span
                    className={item.current > item.previous ? 'text-red-500' : 'text-green-500'}>
                    {item.current > item.previous ? '+' : '-'}$
                    {Math.abs(item.current - item.previous)}
                  </span>
                </div>
              </div>
              <p className='text-xs text-muted-foreground'>from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default SpendingChange;
