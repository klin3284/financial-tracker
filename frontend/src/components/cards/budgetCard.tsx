import { PiggyBank } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';

const BudgetCard = () => (
  <Card x-chunk='dashboard-01-chunk-1'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Budget Remaining</CardTitle>
      <PiggyBank className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>$420.11</div>
      <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
    </CardContent>
  </Card>
);

export default BudgetCard;
