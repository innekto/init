import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';

import * as dotenv from 'dotenv';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

const { JWT_SECRET, TOKEN_EXPIRES_IN } = process.env;

@Module({
  imports: [
    TypeOrmModule.forFeature([]),

    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: TOKEN_EXPIRES_IN },
    }),
  ],
  providers: [JwtStrategy, RefreshJwtStrategy, AuthService],
  controllers: [],
})
export class AuthModule {}
