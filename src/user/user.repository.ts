import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getBalance(userId: number): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.balance.toString();
  }

  async updateBalance(userId: number, balance: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { balance },
    });
  }
}
