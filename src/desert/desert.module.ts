import { Module } from '@nestjs/common';
import { DesertService } from './desert.service';
import { DesertController } from './desert.controller';
import { Desert } from './entities/desert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DesertTypeEntity } from './entities/desert-type.entity';
import { DesertFillingEntity } from './entities/filling.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Desert, DesertTypeEntity, DesertFillingEntity]),
  ],
  controllers: [DesertController],
  providers: [DesertService, CloudinaryService],
})
export class DesertModule {}
