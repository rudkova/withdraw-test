import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaymentsTransactionService } from './payments.transactions.service';
import { UserService } from '../user/user.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

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
      console.log(`User with id ${userId} not found`);
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.paymentsTransactionService.withdraw(payment);
    } catch (e) {
      console.log(`Withdraw failed for user with id ${userId}`, e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
