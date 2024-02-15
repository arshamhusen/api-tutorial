import { PrismaService } from 'src/prisma/prisma.service';
const { Injectable } = require('@nestjs/common');

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    let users = await this.prisma.user.findMany();
    return users;
  }
}
