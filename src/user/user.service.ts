import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { getUserBalanceCacheKey } from '../shared/utils/cache-key.util';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
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
      const balance = await this.userRepository.getBalance(userId);

      try {
        await this.cacheService.set(
          getUserBalanceCacheKey(userId),
          balance,
          10000,
        );
        console.log('Cache set success for', getUserBalanceCacheKey(userId));
      } catch (err) {
        console.error('Cache set error:', err);
      }

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
