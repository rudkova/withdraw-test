import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PaymentsTransactionService } from './payments.transactions.service';
import { UserService } from '../user/user.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { REDIS_CLIENT, REDIS_KEYS } from '../redis/redis.constants';
import Redis from 'ioredis';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsTransactionService: PaymentsTransactionService,
    private readonly userService: UserService,
    @Inject(REDIS_CLIENT) private readonly redisClient: Redis,
  ) {}

  async withdraw(payment: CreatePaymentDto): Promise<string> {
    const { userId } = payment;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      console.log(`User with id ${userId} not found`);
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const balance = await this.paymentsTransactionService.withdraw(payment);

      await this.redisClient.set(
        `${REDIS_KEYS.userBalance}${userId}`,
        balance,
        'EX',
        10,
      );

      return balance;
    } catch (e) {
      console.log(`Withdraw failed for user with id ${userId}`, e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
