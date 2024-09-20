import { User } from '@prisma/client';
import UserDAO from '../dao/usersDao';

export default class UserService {
  static _instance?: UserService;

  _userDao: UserDAO;

  private constructor(userDao: UserDAO) {
    this._userDao = userDao;
  }

  static initializeService(userDao: UserDAO) {
    UserService._instance = new UserService(userDao);
  }

  /**
   * Retrieve the singleton UserService.
   *
   * There is only a single instance of the UserService - it follows the singleton pattern
   */
  static getInstance(): UserService {
    if (UserService._instance === undefined) {
      throw new Error('UserService must be initialized before getInstance is called');
    }
    return UserService._instance;
  }

  public async createUser(user: User): Promise<User> {
    if (user.id) {
      const existingUser = await this._userDao.getUserById(user.id);
      if (existingUser) {
        throw new Error('This user already exists');
      }
    }
    const newUser = await this._userDao.createUser(user);
    return newUser;
  }

  public async getUserById(id?: string, clerkUserId?: string): Promise<User | null> {
    if (!id && !clerkUserId) {
      throw new Error('id or userId is required to get user');
    }
    return this._userDao.getUserById(id, clerkUserId);
  }

  public async updateUser(id: string, data: Partial<User>): Promise<User> {
    if (!id) {
      throw new Error('User ID is required to update user');
    }
    const updatedUser = await this._userDao.updateUser(id, data);
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<void> {
    return this._userDao.deleteUser(id);
  }
}
