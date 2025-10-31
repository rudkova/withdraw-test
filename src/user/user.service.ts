import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUserById(userId: number): Promise<User | null> {
    try {
      return this.userRepository.getUserById(userId);
    } catch (e) {
      console.log(`Failed to get user by id ${userId}`, e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  getBalance(userId: number): Promise<number> {
    try {
      return this.userRepository.getBalance(userId);
    } catch (e) {
      console.log(
        `Failed to get balance for user with id ${userId}`,
        e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
