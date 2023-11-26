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
    console.log('serialize user');
    done(null, user);
  }
  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findOne(payload.id);
    console.log('deserialize user');
    return user ? done(null, user) : done(null, null);
  }
}
