import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/withdraw')
  async withdraw(@Body() payment: CreatePaymentDto): Promise<void> {
    await this.paymentsService.withdraw(payment);
  }
}
