import { Tag, Transaction, TransactionType } from '@prisma/client';
import TransactionDAO from '../dao/transactionDao';
import UserDAO from '../dao/usersDao';
import {
  CreateTransactionRequest,
  TransactionByDateRequest,
  UpdateTransactionRequest,
} from '../model/transaction';

export default class TransactionService {
  static _instance?: TransactionService;

  _userDao: UserDAO;

  _transactionDao: TransactionDAO;

  private constructor(transactionDao: TransactionDAO, userDao: UserDAO) {
    this._transactionDao = transactionDao;
    this._userDao = userDao;
  }

  static initializeService(transactionDao: TransactionDAO, userDao: UserDAO) {
    TransactionService._instance = new TransactionService(transactionDao, userDao);
  }

  /**
   * Retrieve the singleton TransactionService.
   *
   * There is only a single instance of the TransactionService - it follows the singleton pattern
   */
  static getInstance(): TransactionService {
    if (TransactionService._instance === undefined) {
      throw new Error('TransactionService must be initialized before getInstance is called');
    }
    return TransactionService._instance;
  }

  public async createTransaction(req: CreateTransactionRequest): Promise<Transaction> {
    if (req.userId) {
      const user = await this._userDao.getUserById(req.userId);
      if (!user) {
        throw new Error('User not found for this transaction');
      }
    }
    const newTransaction = await this._transactionDao.createTransaction(req);
    return newTransaction;
  }

  public async getTransactionById(id: string): Promise<Transaction | null> {
    return this._transactionDao.getTransactionById(id);
  }

  public async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return this._transactionDao.getTransactionsByUser(userId);
  }

  public async getTransactionsByDateRange(req: TransactionByDateRequest): Promise<Transaction[]> {
    const { startDate, endDate } = req;

    if (startDate > endDate) {
      throw new Error('Start date cannot be after end date');
    }
    return this._transactionDao.getTransactionsByDateRange(req);
  }

  public async getTransactionsByTag(userId: string, tag: Tag): Promise<Transaction[]> {
    return this._transactionDao.getTransactionsByTag(userId, tag);
  }

  public async getTransactionsByType(
    userId: string,
    type: TransactionType,
  ): Promise<Transaction[]> {
    return this._transactionDao.getTransactionsByType(userId, type);
  }

  public async deleteTransaction(id: string): Promise<void> {
    if (id) {
      const transaction = await this.getTransactionById(id);
      if (!transaction) {
        throw new Error('Transaction not found for this deletion');
      }
    }
    await this._transactionDao.deleteTransaction(id);
  }

  public async updateTransaction(req: UpdateTransactionRequest): Promise<Transaction> {
    if (req.id) {
      const transaction = await this.getTransactionById(req.id);
      if (!transaction) {
        throw new Error('Transaction not found for this update');
      }
    }
    const updatedTransaction = await this._transactionDao.updateTransaction(req);
    return updatedTransaction;
  }
}
