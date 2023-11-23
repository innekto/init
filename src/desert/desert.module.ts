import { Module } from '@nestjs/common';
import { DesertService } from './desert.service';
import { DesertController } from './desert.controller';
import { Desert } from './entities/desert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Desert])],
  controllers: [DesertController],
  providers: [DesertService, CloudinaryService],
})
export class DesertModule {}
