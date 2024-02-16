import { Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
const { Injectable } = require('@nestjs/common');

@UseGuards(JwtGuard)
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    let users = await this.prisma.user.findMany();
    return users;
  }

  async getMe(@Req() req: Request) {
    return req.user;
  }
}
