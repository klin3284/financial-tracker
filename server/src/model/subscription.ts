import { SubscriptionFrequency } from '@prisma/client';

export type CreateSubscriptionRequest = {
  name: string;
  amount: number;
  startDate: Date;
  frequency: SubscriptionFrequency;
  userId: string;
};

export type UpdateSubscriptionRequest = {
  id: string;
  data: {
    name?: string;
    amount?: number;
    startDate?: Date;
    frequency?: SubscriptionFrequency;
  };
};
