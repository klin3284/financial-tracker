import { Budget } from '@prisma/client';
import prisma from '../lib/prisma';
import { CreateBudgetRequest, UpdateBudgetRequest } from '../model/budget';

export default class BudgetDao {
  public async createBudget(data: CreateBudgetRequest): Promise<Budget> {
    const newBudget = await prisma.budget.create({ data });
    return newBudget;
  }

  public async getBudgetById(id?: string, userId?: string): Promise<Budget | null> {
    const query = id ? { id } : { userId };

    const budget = await prisma.budget.findUnique({ where: { ...query } });
    return budget;
  }

  public async updateBudget(request: UpdateBudgetRequest): Promise<Budget> {
    const { id, data } = request;
    const updatedBudget = await prisma.budget.update({ where: { id }, data });
    return updatedBudget;
  }

  public async deleteBudget(id: string): Promise<void> {
    await prisma.budget.delete({ where: { id } });
  }
}
