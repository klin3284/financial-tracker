import { Subscription } from '@prisma/client';
import SubscriptionDAO from '../dao/subscriptionDao';
import UserDAO from '../dao/usersDao';
import { CreateSubscriptionRequest, UpdateSubscriptionRequest } from '../model/subscription';

export default class SubscriptionService {
  static _instance?: SubscriptionService;

  _subscriptionDao: SubscriptionDAO;

  _userDao: UserDAO;

  private constructor(subscriptionDao: SubscriptionDAO, userDao: UserDAO) {
    this._subscriptionDao = subscriptionDao;
    this._userDao = userDao;
  }

  static initializeService(subscriptionDao: SubscriptionDAO, userDao: UserDAO) {
    SubscriptionService._instance = new SubscriptionService(subscriptionDao, userDao);
  }

  /**
   * Retrieve the singleton SubscriptionService.
   *
   * There is only a single instance of the SubscriptionService - it follows the singleton pattern
   */
  static getInstance(): SubscriptionService {
    if (SubscriptionService._instance === undefined) {
      throw new Error('SubscriptionService must be initialized before getInstance is called');
    }
    return SubscriptionService._instance;
  }

  public async createSubscription(data: CreateSubscriptionRequest): Promise<Subscription> {
    if (data.userId) {
      const user = await this._userDao.getUserById(data.userId);
      if (!user) {
        throw new Error('User not found for this subscription');
      }
    }
    const newSubscription = await this._subscriptionDao.createSubscription(data);
    return newSubscription;
  }

  public async getSubscriptionById(id: string): Promise<Subscription | null> {
    const subscription = await this._subscriptionDao.getSubscriptionById(id);
    return subscription;
  }

  public async getSubscriptionsByUser(userId: string): Promise<Subscription[]> {
    const subscriptions = await this._subscriptionDao.getSubscriptionsByUser(userId);
    return subscriptions;
  }

  public async updateSubscription(data: UpdateSubscriptionRequest): Promise<Subscription> {
    if (data.id) {
      const subscription = await this._subscriptionDao.getSubscriptionById(data.id);
      if (!subscription) {
        throw new Error('Subscription not found for this subscription');
      }
    }
    const updatedSubscription = await this._subscriptionDao.updateSubscription(data);
    return updatedSubscription;
  }

  public async deleteSubscription(id: string): Promise<void> {
    return this._subscriptionDao.deleteSubscription(id);
  }
}
