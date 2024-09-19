import { Tag, TransactionType } from '@prisma/client';

export type CreateTransactionRequest = {
  amount: number;
  description?: string;
  date?: Date;
  type?: TransactionType;
  tag?: Tag;
  userId: string;
};

export type TransactionByDateRequest = {
  userId: string;
  startDate: Date;
  endDate: Date;
};

export type UpdateTransactionRequest = {
  id: string;
  data: {
    amount?: number;
    description?: string;
    date?: Date;
    type?: TransactionType;
    tag?: Tag;
  };
};
