import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './entities/admin.entity';
import { AuthService } from 'src/auth/auth.service';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';

const { JWT_SECRET } = process.env;

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '40m' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, AuthService, CloudinaryService, ConfigService],
  exports: [AdminService],
})
export class AdminModule {}
