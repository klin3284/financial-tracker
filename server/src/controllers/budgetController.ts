import { Route, Tags, Controller, Post, Body, Get, Path } from 'tsoa';
import { Budget } from '@prisma/client';
import BudgetService from '../services/budgetService';
import { CreateBudgetRequest, UpdateBudgetRequest } from '../model/budget';

@Route('budgets')
@Tags('budgets')
export class BudgetController extends Controller {
  private _budgetService: BudgetService = BudgetService.getInstance();

  @Post()
  public async createBudget(@Body() req: CreateBudgetRequest): Promise<Budget> {
    const newBudget = await this._budgetService.createBudget(req);
    return newBudget;
  }

  @Get('{id}')
  public async getBudgetById(@Path() id: string): Promise<Budget | null> {
    const budget = await this._budgetService.getBudgetById(id);
    return budget;
  }

  @Get('by_user/{userId}')
  public async getBudgetsByUser(@Path() userId: string): Promise<Budget | null> {
    const budgets = await this._budgetService.getBudgetById(userId);
    return budgets;
  }

  @Post('update')
  public async updateBudget(@Body() req: UpdateBudgetRequest): Promise<Budget> {
    const updatedBudget = await this._budgetService.updateBudget(req);
    return updatedBudget;
  }

  @Post('delete/{id}')
  public async deleteBudget(@Path() id: string): Promise<void> {
    await this._budgetService.deleteBudget(id);
  }
}
