import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    try {
      // create the user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });

      return {
        message: 'User created',
        user,
      };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
    }
  }

  async signIn(dto: AuthDto) {
    // find the username by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // verify the password
    const passwordMatch = await argon.verify(user.hash, dto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Invalid password');
    }

    delete user.hash;
    return user;
  }
}
