import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';

import * as dotenv from 'dotenv';
import { Role } from 'src/common/emuns/role.emun';

dotenv.config();

const { JWT_SECRET } = process.env;

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.role !== Role.Admin) {
      throw new UnauthorizedException(
        'You do not have the required permissions.',
      );
    }

    return payload;
  }
}
