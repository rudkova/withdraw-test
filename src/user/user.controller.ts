import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('balance/:userId')
  async getBalance(@Param('userId') userId: string): Promise<string> {
    return this.userService.getBalance(Number(userId));
  }
}
