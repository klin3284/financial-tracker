import { Budget } from '@prisma/client';
import BudgetDao from '../dao/budgetDao';
import UserDao from '../dao/usersDao';
import { CreateBudgetRequest, UpdateBudgetRequest } from '../model/budget';

export default class BudgetService {
  static _instance?: BudgetService;

  _userDao: UserDao;

  _budgetDao: BudgetDao;

  private constructor(budgetDao: BudgetDao, userDao: UserDao) {
    this._budgetDao = budgetDao;
    this._userDao = userDao;
  }

  static initializeService(budgetDao: BudgetDao, userDao: UserDao) {
    BudgetService._instance = new BudgetService(budgetDao, userDao);
  }

  /**
   * Retrieve the singleton BudgetService.
   *
   * There is only a single instance of the BudgetService - it follows the singleton pattern
   */
  static getInstance(): BudgetService {
    if (BudgetService._instance === undefined) {
      throw new Error('BudgetService must be initialized before getInstance is called');
    }
    return BudgetService._instance;
  }

  private _areAllUndefinedOrNot = (arr: (number | undefined)[]): boolean =>
    arr.every(item => item === undefined) || arr.every(item => item !== undefined);

  private _validateBudgetPercentages(data: {
    savingsPercentage?: number;
    needsPercentage?: number;
    wantsPercentage?: number;
  }): void {
    const percentages = [data.savingsPercentage, data.needsPercentage, data.wantsPercentage];

    if (!this._areAllUndefinedOrNot(percentages)) {
      throw new Error('The savings, needs, and wants percentages must be changed together');
    }

    if (
      percentages.every(p => p !== undefined) &&
      percentages.reduce((sum, p) => sum + (p || 0), 0) !== 100
    ) {
      throw new Error('The sum of savings, needs, and wants percentages must be equal to 100');
    }
  }

  public async createBudget(data: CreateBudgetRequest): Promise<Budget> {
    if (data.userId) {
      const user = await this._userDao.getUserById(data.userId);
      if (!user) {
        throw new Error('User not found for this budget');
      }
    }
    this._validateBudgetPercentages(data);

    const newBudget = await this._budgetDao.createBudget(data);
    return newBudget;
  }

  public async getBudgetById(id?: string, userId?: string): Promise<Budget | null> {
    if (!id && !userId) {
      throw new Error('id or userId is required to get budget');
    }
    return this._budgetDao.getBudgetById(id);
  }

  public async updateBudget(req: UpdateBudgetRequest): Promise<Budget> {
    if (!req.id) {
      throw new Error('budget id is required to update budget');
    }

    const budget = await this.getBudgetById(req.id);
    if (!budget) {
      throw new Error('Budget not found for this update');
    }
    this._validateBudgetPercentages(req.data);

    return this._budgetDao.updateBudget(req);
  }

  public async deleteBudget(id: string): Promise<void> {
    if (id) {
      const budget = await this.getBudgetById(id);
      if (!budget) {
        throw new Error('Budget not found for this deletion');
      }
    }
    return this._budgetDao.deleteBudget(id);
  }
}
