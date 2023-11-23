import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { IUser } from '../../common/types/types';
import { RefreshDto } from './dto/refreshToken.dto';
dotenv.config();

const { JWT_SECRET } = process.env;

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(refreshDto: RefreshDto, user: IUser) {
    if (!refreshDto || !refreshDto.refresh) {
      throw new BadRequestException('Refresh token is required');
    }

    return { id: user.id, email: user.email };
  }
}
