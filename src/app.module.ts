import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

import { dataSourceOptionst } from './database/database-config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

import { AuthService } from './auth/auth.service';

import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminJwtStrategy } from './auth/strategies/admin.jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotFoundInterceptor } from './common/interceptors/find-one-interceptor';
import { AdminModule } from './admin/admin.module';

import { Admin } from './admin/entities/admin.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

import { WhoWeAreModule } from './who-we-are/who-we-are.module';
import { ServicesModule } from './services/services.module';
import { MemberModule } from './member/member.module';
import { EventModule } from './event/event.module';
import { SpeakerModule } from './speaker/speaker.module';
import { TeamFormModule } from './team-form/team-form.module';

import { BusinessFormModule } from './business-form/business-form.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsUniqueInterceptor } from './common/interceptors/is-unique.interceptor';
import { EventformModule } from './eventform/eventform.module';
import { SocialModule } from './social/social.module';

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
    { provide: APP_INTERCEPTOR, useClass: IsUniqueInterceptor },
  ],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Admin, Category]),
    TypeOrmModule.forRoot(dataSourceOptionst),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: configService.get<string>('MAILER_SERVICE'),
          host: configService.get<string>('MAILER_HOST'),
          port: configService.get<string>('MAILER_PORT'),
          secure: configService.get<string>('MAILER_SECURE'),
          auth: {
            user: configService.get<string>('MAILER_USER'),
            pass: configService.get<string>('MAILER_PASS'),
          },
        },
      }),
      inject: [ConfigService],
    }),

    PassportModule.register({ session: true }),
    AuthModule,
    CloudinaryModule,
    AdminModule,
    CategoriesModule,

    WhoWeAreModule,
    ServicesModule,
    MemberModule,
    EventModule,
    SpeakerModule,
    TeamFormModule,
    BusinessFormModule,
    EventformModule,
    SocialModule,
  ],
})
export class AppModule {}
