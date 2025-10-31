import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getBalance(userId: number): Promise<number> {
    try {
      return this.userRepository.getBalance(userId);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
