'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, ArrowUpRight, CalendarIcon } from 'lucide-react';
import { Calendar } from '@components/ui/calendar';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Textarea } from '@components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Transaction } from '@generated/models/Transaction';
import { CreateTransactionRequest } from '@generated/models/CreateTransactionRequest';
import { useUser } from '@clerk/nextjs';
import { TagEnum, Tag } from '@generated/models/Tag';
import { TransactionTypeEnum, TransactionType } from '@generated/models/TransactionType';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { format } from 'date-fns';

interface TransactionCardProps {
  transactions: Transaction[];
  createTransaction: (transaction: CreateTransactionRequest) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transactions, createTransaction }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState<Tag | undefined>(TagEnum.FOOD);
  const [type, setType] = useState<TransactionType | undefined>(TransactionTypeEnum.EXPENSE);
  const [amount, setAmount] = useState('');
  const userId = useUser().user?.id;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userId || !amount) {
      return;
    }

    await createTransaction({
      userId,
      description,
      tag,
      type,
      amount: parseFloat(amount),
      date: date?.toISOString(),
    });
    setDescription('');
    setTag(TagEnum.FOOD);
    setType(TransactionTypeEnum.EXPENSE);
    setAmount('');
    setIsSheetOpen(false);
  };

  function _capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <Card id='transactionCard' className='xl:col-span-2'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent transactions</CardDescription>
        </div>
        <div className='flex ml-auto space-x-2'>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button size='sm' className='gap-1'>
                <Plus className='h-4 w-4' />
                Create Transaction
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create New Transaction</SheetTitle>
                <SheetDescription>Add a new transaction.</SheetDescription>
              </SheetHeader>
              <form className='space-y-4 mt-4' onSubmit={handleSubmit}>
                <div className='space-y-2'>
                  <Label htmlFor='description'>Item Description</Label>
                  <Textarea
                    id='description'
                    placeholder='Description'
                    value={description}
                    onChange={e => setAmount(e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='amount'>Amount</Label>
                  <Input
                    id='amount'
                    type='number'
                    placeholder='0.00'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='date'>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={`w-full justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}>
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align='start' className='w-auto p-0 bg-popover'>
                      <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='type'>Category</Label>
                  <Select value={tag} onValueChange={value => setTag(value as Tag)}>
                    <SelectTrigger id='type'>
                      <SelectValue placeholder='--' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TagEnum).map(tagValue => (
                        <SelectItem key={tagValue} value={tagValue}>
                          {_capitalizeFirstLetter(tagValue)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='type'>Type</Label>
                  <Select value={type} onValueChange={value => setType(value as TransactionType)}>
                    <SelectTrigger id='type'>
                      <SelectValue placeholder='--' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TransactionTypeEnum).map(typeValue => (
                        <SelectItem key={typeValue} value={typeValue}>
                          {_capitalizeFirstLetter(typeValue)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type='submit' className='w-full'>
                  Create Transaction
                </Button>
              </form>
            </SheetContent>
          </Sheet>
          <Button asChild size='sm' variant='secondary' className='ml-auto gap-1'>
            <Link href='#'>
              View All
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>
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
            {transactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className='font-medium'>{transaction.description}</div>
                </TableCell>
                <TableCell className='hidden xl:table-cell'>{transaction.date}</TableCell>
                <TableCell className='hidden xl:table-cell'>
                  <Badge variant='outline'>{transaction.tag}</Badge>
                </TableCell>
                <TableCell className='hidden xl:table-cell'>
                  <Badge variant='outline'>{transaction.type}</Badge>
                </TableCell>
                <TableCell className='text-right'>{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
