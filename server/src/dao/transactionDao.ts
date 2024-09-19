import { Transaction, TransactionType, Tag } from '@prisma/client';
import prisma from '../lib/prisma';
import { CreateTransactionRequest, TransactionByDateRequest } from '../model/transaction';

export default class TransactionDAO {
  public async createTransaction(data: CreateTransactionRequest): Promise<Transaction> {
    const newTransaction = await prisma.transaction.create({ data });
    return newTransaction;
  }

  public async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({ where: { userId } });
    return transactions;
  }

  public async getTransactionById(id: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({ where: { id } });
    return transaction;
  }

  public async getTransactionsByDateRange(data: TransactionByDateRequest): Promise<Transaction[]> {
    const { userId, startDate, endDate } = data;
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return transactions;
  }

  public async getTransactionsByTag(userId: string, tag: Tag): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        tag,
      },
    });
    return transactions;
  }

  public async getTransactionsByType(
    userId: string,
    type: TransactionType,
  ): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type,
      },
    });
    return transactions;
  }

  public async updateTransaction(id: string, data: Partial<Transaction>): Promise<Transaction> {
    const updatedTransaction = await prisma.transaction.update({ where: { id }, data });
    return updatedTransaction;
  }

  public async deleteTransaction(id: string): Promise<void> {
    await prisma.transaction.delete({ where: { id } });
  }
}
