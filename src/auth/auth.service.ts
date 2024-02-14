import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  signUp() {
    return 'Sign up!';
  }

  signIn() {
    return 'Sign in!';
  }
}
