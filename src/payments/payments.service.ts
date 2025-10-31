import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UserService } from '../user/user.service';
import { PaymentsTransactionService } from './payments.transactions.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsTransactionService: PaymentsTransactionService,
    private readonly userService: UserService,
  ) {}

  async withdraw(payment: CreatePaymentDto): Promise<void> {
    const { userId } = payment;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    try {
      await this.paymentsTransactionService.withdraw(payment);
    } catch (e) {
      console.log(`Withdraw failed for user with id ${userId}`, e.message);
      throw new Error(e.message);
    }
  }
}
