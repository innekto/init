import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

import { dataSourceOptionst } from './database/database-config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

import { AuthService } from './auth/auth.service';
import { User } from './users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminJwtStrategy } from './auth/strategies/admin.jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotFoundInterceptor } from './common/interceptors/find-one-interceptor';
import { AdminModule } from './admin/admin.module';

import { Admin } from './admin/entities/admin.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

import { WhatIsDoneModule } from './what-is-done/what-is-done.module';

import { WhatIsDone } from './what-is-done/entities/what-is-done.entity';
import { WhoWeAreModule } from './who-we-are/who-we-are.module';
import { ServicesModule } from './services/services.module';
import { MemberModule } from './member/member.module';
import { EventModule } from './event/event.module';
import { SpeakerModule } from './speaker/speaker.module';
import { TeamFormModule } from './team-form/team-form.module';

// dotenv.config();

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    AdminJwtStrategy,
    AuthService,
    JwtService,

    {
      provide: APP_INTERCEPTOR,
      useClass: NotFoundInterceptor,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([User, Admin, Category, WhatIsDone]),
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

    AuthModule,

    CloudinaryModule,

    AdminModule,

    CategoriesModule,

    WhatIsDoneModule,

    WhoWeAreModule,

    ServicesModule,

    MemberModule,

    EventModule,

    SpeakerModule,

    TeamFormModule,
  ],
})
export class AppModule {}
