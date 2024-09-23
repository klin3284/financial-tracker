import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@components/ui/table';

const TransactionCard = () => (
  <Card id='transactionCard' className='xl:col-span-2'>
    <CardHeader className='flex flex-row items-center'>
      <div className='grid gap-2'>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Recent transactions</CardDescription>
      </div>
      <Button asChild size='sm' className='ml-auto gap-1'>
        <Link href='#'>
          View All
          <ArrowUpRight className='h-4 w-4' />
        </Link>
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className='hidden xl:table-cell'>Date</TableHead>
            <TableHead className='hidden xl:table-cell'>Tag</TableHead>
            <TableHead className='hidden xl:table-cell'>Type</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className='font-medium'>Grocery Shopping</div>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>2023-06-23</TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>FOOD</Badge>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>EXPENSE</Badge>
            </TableCell>
            <TableCell className='text-right'>$150.75</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className='font-medium'>Monthly Bus Pass</div>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>2023-06-24</TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>TRANSPORTATION</Badge>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>EXPENSE</Badge>
            </TableCell>
            <TableCell className='text-right'>$65.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className='font-medium'>Movie Night</div>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>2023-06-25</TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>ENTERTAINMENT</Badge>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>EXPENSE</Badge>
            </TableCell>
            <TableCell className='text-right'>$35.50</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className='font-medium'>Electricity Bill</div>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>2023-06-26</TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>BILLS</Badge>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>EXPENSE</Badge>
            </TableCell>
            <TableCell className='text-right'>$120.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className='font-medium'>Salary Deposit</div>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>2023-06-27</TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>OTHER</Badge>
            </TableCell>
            <TableCell className='hidden xl:table-cell'>
              <Badge variant='outline'>INCOME</Badge>
            </TableCell>
            <TableCell className='text-right'>$3000.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default TransactionCard;
