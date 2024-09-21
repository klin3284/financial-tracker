import { Subscription } from '@prisma/client';
import prisma from '../lib/prisma';
import { CreateSubscriptionRequest, UpdateSubscriptionRequest } from '../model/subscription';

export default class SubscriptionDao {
  public async createSubscription(data: CreateSubscriptionRequest): Promise<Subscription> {
    const newSubscription = await prisma.subscription.create({ data });
    return newSubscription;
  }

  public async getSubscriptionById(id: string): Promise<Subscription | null> {
    const subscription = await prisma.subscription.findUnique({ where: { id } });
    return subscription;
  }

  public async getSubscriptionsByUser(id: string): Promise<Subscription[]> {
    const subscriptions = await prisma.subscription.findMany({ where: { userId: id } });
    return subscriptions;
  }

  public async updateSubscription(req: UpdateSubscriptionRequest): Promise<Subscription> {
    const { id, data } = req;
    const updatedSubscription = await prisma.subscription.update({ where: { id }, data });
    return updatedSubscription;
  }

  public async deleteSubscription(id: string): Promise<void> {
    await prisma.subscription.delete({ where: { id } });
  }
}
