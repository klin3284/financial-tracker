import { User } from '@prisma/client';
import prisma from '../lib/prisma';

export async function createUser(data: User): Promise<User> {
  const newUser = await prisma.user.create({ data });
  return newUser;
}

export async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUserById(id?: string, clerkUserId?: string): Promise<User | null> {
  if (!id && !clerkUserId) {
    throw new Error('id or clerkUserId is required');
  }
  const query = id ? { id } : { clerkUserId };

  const user = await prisma.user.findUnique({ where: query });
  return user;
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const updatedUser = await prisma.user.update({ where: { id }, data });
  return updatedUser;
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } });
}
