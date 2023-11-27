/* eslint-disable @typescript-eslint/ban-types */
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from 'src/users/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findOneById(payload.id);

    return user ? done(null, user) : done(null, null);
  }
}
