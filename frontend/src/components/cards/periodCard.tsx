import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

const PeriodCard = () => {
  const formattedDate = format(new Date(), 'EEEE, MMM do, yyyy');

  return (
    <Card x-chunk='dashboard-01-chunk-2'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Period</CardTitle>
        <Calendar className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{format(new Date(), 'MMMM yyyy')}</div>
        <p className='text-xs text-muted-foreground'>{formattedDate}</p>
      </CardContent>
    </Card>
  );
};

export default PeriodCard;
