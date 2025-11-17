import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpCacheInterceptor } from '../interceptors/http-cache.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(HttpCacheInterceptor)
  // @CacheTTL(20) // overrides global ttl
  @Get('balance/:userId')
  async getBalance(@Param('userId') userId: string): Promise<string> {
    return this.userService.getBalance(Number(userId));
  }
}
