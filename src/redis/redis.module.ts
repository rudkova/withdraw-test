import { REDIS_CLIENT } from './redis.constants';
import { Module } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
          showFriendlyErrorStack: true,
        });
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
