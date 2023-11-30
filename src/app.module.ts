import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { DesertModule } from './desert/desert.module';
import { DataBaseCreateService } from './database/servise/data-base-create.service';
import { Desert } from './desert/entities/desert.entity';
import { OrderModule } from './order/order.module';
import { dataSourceOptionst } from './database/database-config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { DesertTypeEntity } from './desert/entities/desert-type.entity';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { AuthService } from './auth/auth.service';
import { User } from './users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DesertFillingEntity } from './desert/entities/filling.entity';

// dotenv.config();

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    DataBaseCreateService,
    GoogleStrategy,
    AuthService,
    JwtService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Desert,
      DesertTypeEntity,
      User,
      DesertFillingEntity,
    ]),
    TypeOrmModule.forRoot(dataSourceOptionst),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        //   secureConnection: false,
        auth: {
          user: 'virchenko.vlad.2021@gmail.com',
          pass: 'xtdklgmizwqtlbwz',
        },
      },
    }),

    PassportModule.register({ session: true }),
    UsersModule,
    RolesModule,
    AuthModule,
    DesertModule,
    OrderModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
