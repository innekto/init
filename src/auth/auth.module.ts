import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';

import * as dotenv from 'dotenv';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Admin } from 'src/admin/entities/admin.entity';

dotenv.config();

const { JWT_SECRET, TOKEN_EXPIRES_IN } = process.env;

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),

    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: TOKEN_EXPIRES_IN },
    }),
  ],
  providers: [JwtStrategy, AuthService, ConfigService],
  controllers: [],
})
export class AuthModule {}
