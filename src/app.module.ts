import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [UserModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
