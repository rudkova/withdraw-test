import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsRepository } from './payments.repository';
import { PaymentsTransactionService } from './payments.transactions.service';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../shared/database/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentsRepository,
    PaymentsTransactionService,
    PrismaService,
  ],
  imports: [UserModule],
})
export class PaymentsModule {}
