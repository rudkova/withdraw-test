import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PaymentsModule } from './payments/payments.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [UserModule, PaymentsModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
