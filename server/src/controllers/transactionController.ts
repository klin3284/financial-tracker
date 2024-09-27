import { Route, Tags, Controller, Post, Body, Get, Path, Query } from 'tsoa';
import { Tag, Transaction, TransactionType } from '@prisma/client';
import TransactionService from '../services/transactionService';
import {
  CreateTransactionRequest,
  PaginatedTransactionResponse,
  UpdateTransactionRequest,
} from '../model/transaction';

@Route('transactions')
@Tags('transactions')
export class TransactionController extends Controller {
  private _transactionService: TransactionService = TransactionService.getInstance();

  @Post()
  public async createTransaction(@Body() req: CreateTransactionRequest): Promise<Transaction> {
    const newTransaction = await this._transactionService.createTransaction(req);
    return newTransaction;
  }

  @Get('{id}')
  public async getTransactionById(@Path() id: string): Promise<Transaction | null> {
    const transaction = await this._transactionService.getTransactionById(id);
    return transaction;
  }

  @Get('by_user/{userId}')
  public async getTransactionsByUser(
    @Path() userId: string,
    @Query() page: number = 1,
    @Query() limit: number = 20,
  ): Promise<PaginatedTransactionResponse> {
    const transactions = await this._transactionService.getTransactionsByUser(userId, page, limit);
    return transactions;
  }

  @Get('by_date_range/{userId}')
  public async getTransactionsByDateRange(
    @Path() userId: string,
    @Query() startDate: string,
    @Query() endDate: string,
  ): Promise<Transaction[]> {
    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);
    const transactions = await this._transactionService.getTransactionsByDateRange({
      userId,
      startDate: fromDate,
      endDate: toDate,
    });
    return transactions;
  }

  @Get('by_tag/{userId}')
  public async getTransactionsByTag(
    @Path() userId: string,
    @Query() tag: Tag,
  ): Promise<Transaction[]> {
    const transactions = await this._transactionService.getTransactionsByTag(userId, tag);
    return transactions;
  }

  @Get('by_type/{userId}')
  public async getTransactionsByType(
    @Path() userId: string,
    @Query() type: TransactionType,
  ): Promise<Transaction[]> {
    const transactions = await this._transactionService.getTransactionsByType(userId, type);
    return transactions;
  }

  @Post('delete/{id}')
  public async deleteTransaction(@Path() id: string): Promise<void> {
    await this._transactionService.deleteTransaction(id);
  }

  @Post('/update')
  public async updateTransaction(@Body() req: UpdateTransactionRequest): Promise<Transaction> {
    const transaction = await this._transactionService.updateTransaction(req);
    return transaction;
  }
}
