import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PrismaService } from '../shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import { calculateBalance } from './helpers/helpers';
import { Action } from './action.enum';

const MAX_ATTEMPTS = process.env.MAX_ATTEMPTS
  ? Number(process.env.MAX_ATTEMPTS)
  : 3;
const DELAY = process.env.DELAY ? Number(process.env.DELAY) : 1000;

@Injectable()
export class PaymentsTransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async withdraw({ userId, amount }: CreatePaymentDto): Promise<void> {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      try {
        await this.prisma.$transaction(
          async (tx) => {
            // get user payments to calculate actual balance
            const payments = await tx.payment.findMany({
              where: {
                userId,
              },
              include: {
                action: true,
              },
              orderBy: {
                ts: 'asc',
              },
            });
            const curBalance = calculateBalance(payments);

            // if balance is not enough throw error
            const newBalance = curBalance - amount;
            if (newBalance < 0) {
              throw new Error(
                `User with id ${userId} doesn't have enough balance`,
              );
            }

            const withdrawAction = await tx.action.findUnique({
              where: { name: Action.WITHDRAW },
            });
            if (!withdrawAction) {
              throw new Error(`Action with name ${Action.WITHDRAW} not found`);
            }

            // create new payment
            await tx.payment.create({
              data: {
                userId,
                amount,
                actionId: withdrawAction.id,
              },
            });

            // update user balance
            const user = await tx.user.update({
              where: { id: userId },
              data: { balance: newBalance },
              select: { balance: true },
            });

            return user.balance;
          },
          {
            maxWait: 5000,
            timeout: 10000,
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          },
        );
        return;
      } catch (error) {
        // need to implement retry logic based on error type but for test exercise i'll leave it as it is for simplicity
        console.log(`Attempt ${attempt} failed with error: ${error.message}.`);
        if (attempt === MAX_ATTEMPTS - 1) {
          throw new Error(error.message);
        } else {
          await new Promise((resolve) => setTimeout(resolve, DELAY));
        }
      }
    }
  }
}
