import { Route, Tags, Controller, Post, Body, Get, Path } from 'tsoa';
import { Subscription } from '@prisma/client';
import SubscriptionService from '../services/subscriptionService';
import { CreateSubscriptionRequest, UpdateSubscriptionRequest } from '../model/subscription';

@Route('subscriptions')
@Tags('subscriptions')
export class SubscriptionController extends Controller {
  private _subscriptionService: SubscriptionService = SubscriptionService.getInstance();

  @Post()
  public async createSubscription(@Body() req: CreateSubscriptionRequest): Promise<Subscription> {
    const newSubscription = await this._subscriptionService.createSubscription(req);
    return newSubscription;
  }

  @Get('{id}')
  public async getSubscriptionById(@Path() id: string): Promise<Subscription | null> {
    const subscription = await this._subscriptionService.getSubscriptionById(id);
    return subscription;
  }

  @Get('by_user/{userId}')
  public async getSubscriptionsByUser(@Path() userId: string): Promise<Subscription[]> {
    const subscriptions = await this._subscriptionService.getSubscriptionsByUser(userId);
    return subscriptions;
  }

  @Post('update')
  public async updateSubscription(@Body() req: UpdateSubscriptionRequest): Promise<Subscription> {
    const updatedSubscription = await this._subscriptionService.updateSubscription(req);
    return updatedSubscription;
  }

  @Post('delete/{id}')
  public async deleteSubscription(@Path() id: string): Promise<void> {
    await this._subscriptionService.deleteSubscription(id);
  }
}
