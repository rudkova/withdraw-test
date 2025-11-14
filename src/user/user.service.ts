import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { REDIS_CLIENT, REDIS_KEYS } from '../redis/redis.constants';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(REDIS_CLIENT) private readonly redisClient: Redis,
  ) {}

  getUserById(userId: number): Promise<User | null> {
    try {
      return this.userRepository.getUserById(userId);
    } catch (e) {
      console.log(`Failed to get user by id ${userId}`, e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getBalance(userId: number): Promise<string> {
    try {
      const cachedBalance = await this.redisClient.get(
        `${REDIS_KEYS.userBalance}${userId}`,
      );

      if (cachedBalance) {
        return cachedBalance;
      }

      const balance = await this.userRepository.getBalance(userId);

      await this.redisClient.set(
        `${REDIS_KEYS.userBalance}${userId}`,
        balance,
        'EX',
        10,
      );

      return balance;
    } catch (e) {
      console.log(
        `Failed to get balance for user with id ${userId}`,
        e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
