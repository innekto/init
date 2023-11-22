import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';

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

@Module({
  controllers: [AppController],
  providers: [AppService, DataBaseCreateService],
  imports: [
    TypeOrmModule.forFeature([Desert]),
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

    UsersModule,
    RolesModule,
    AuthModule,
    DesertModule,
    OrderModule,
  ],
})
export class AppModule {}
