import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    return req.user;
  }
}
