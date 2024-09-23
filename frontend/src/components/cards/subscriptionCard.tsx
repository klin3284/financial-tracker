import { HandCoins } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';

const SubscriptionCard = () => (
  <Card x-chunk='dashboard-01-chunk-3'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>Upcoming Payments</CardTitle>
      <HandCoins className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='flex justify-between items-center'>
        <div>
          <div className='text-2xl font-bold'>$4.99</div>
          <p className='text-xs text-muted-foreground'>2023-10-01</p>
        </div>
        <div>
          <div className='text-xl font-bold'>Spotify</div>
          <p className='text-sm font-medium text-muted-foreground'>Spotify Premium</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default SubscriptionCard;
