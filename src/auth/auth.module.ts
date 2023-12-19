import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';

import * as dotenv from 'dotenv';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './utils/serializer.session';
dotenv.config();

const { JWT_SECRET, TOKEN_EXPIRES_IN } = process.env;

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: TOKEN_EXPIRES_IN },
    }),
  ],
  providers: [
    SessionSerializer,

    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
