import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/database/prisma.service';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(paymentData: Payment) {
    return this.prisma.payment.create({
      data: paymentData,
    });
  }

  async getPaymentsByUserId(userId: number) {
    return this.prisma.payment.findMany({
      where: {
        userId,
      },
    });
  }
}
