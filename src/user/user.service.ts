import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUserById(userId: number): Promise<User | null> {
    try {
      return this.userRepository.getUserById(userId);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  getBalance(userId: number): Promise<number> {
    try {
      return this.userRepository.getBalance(userId);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
