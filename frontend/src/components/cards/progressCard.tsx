import { DollarSignIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { Tag } from '@lib/types';

// Mock data for spending and transactions
const SPENDING_DATA = Object.values(Tag).map(category => ({
  category,
  current: Math.floor(Math.random() * 500) + 100,
  previous: Math.floor(Math.random() * 500) + 100,
  transactions: Math.floor(Math.random() * 20) + 1,
}));

const ProgressCard = () => {
  const totalSpent = SPENDING_DATA.reduce((sum, item) => sum + item.current, 0);
  const totalBudget = 3000; // Example total budget
  const percentageSpent = (totalSpent / totalBudget) * 100;

  const budgetStatus = percentageSpent <= 100 ? 'Under budget' : 'Over budget';
  const statusColor = percentageSpent <= 100 ? 'text-green-500' : 'text-red-500';

  const actualNeedsPercentage = 52;
  const actualSavingsPercentage = 20;
  const actualWantsPercentage = 28;

  let needsColor = '';
  if (actualNeedsPercentage < 50) {
    needsColor = 'text-green-500';
  } else if (actualNeedsPercentage > 50) {
    needsColor = 'text-red-500';
  }

  let savingsColor = '';
  if (actualSavingsPercentage < 20) {
    savingsColor = 'text-red-500';
  } else if (actualSavingsPercentage > 20) {
    savingsColor = 'text-green-500';
  }

  let wantsColor = '';
  if (actualWantsPercentage < 30) {
    wantsColor = 'text-green-500';
  } else if (actualWantsPercentage > 30) {
    wantsColor = 'text-red-500';
  }

  return (
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle>Overall Budget Status</CardTitle>
      </CardHeader>
      <CardContent className='px-4'>
        <div className='flex flex-col md:flex-row items-center space-x-0 md:space-x-10 md:space-y-0 space-y-4'>
          <div className='flex flex-row justify-between md:justify-center px-2 items-center w-full md:w-auto md:space-x-4'>
            <div className='flex items-center space-x-2'>
              <DollarSignIcon className={`h-8 w-8 ${statusColor}`} />
              <div>
                <p className='text-xl md:text-2xl font-bold'>
                  ${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()}
                </p>
                <p className='text-xs text-muted-foreground'>Total spent / Budget</p>
              </div>
            </div>
            <div>
              <p className={`text-xl md:text-2xl font-bold ${statusColor}`}>
                {percentageSpent.toFixed(1)}%
              </p>
              <p className='text-xs text-muted-foreground'>{budgetStatus}</p>
            </div>
          </div>

          <div className='flex flex-row items-center text-center'>
            <div>
              <p className='text-2xl font-bold'>
                <span className={needsColor}>{actualNeedsPercentage}</span>
                {' / '}
                <span className={savingsColor}>{actualSavingsPercentage}</span>
                {' / '}
                <span className={wantsColor}>{actualWantsPercentage}</span>
              </p>
              <p className='text-xs text-muted-foreground'>Needs / Savings / Wants</p>
            </div>
          </div>
        </div>
        <div className='mt-4 h-2 bg-muted rounded-full overflow-hidden'>
          <div
            className={`h-full ${percentageSpent <= 100 ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${Math.min(percentageSpent, 100)}%` }}></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
