import { User } from '@prisma/client';
import prisma from '../lib/prisma';

export default class UsersDao {
  public async createUser(data: User): Promise<User> {
    const newUser = await prisma.user.create({ data });
    return newUser;
  }

  public async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  public async getUserById(id?: string, clerkUserId?: string): Promise<User | null> {
    const query = id ? { id } : { clerkUserId };

    const user = await prisma.user.findUnique({ where: query });
    return user;
  }

  public async updateUser(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({ where: { id }, data });
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
