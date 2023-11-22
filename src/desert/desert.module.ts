import { Module } from '@nestjs/common';
import { DesertService } from './desert.service';
import { DesertController } from './desert.controller';
import { Desert } from './entities/desert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Desert])],
  controllers: [DesertController],
  providers: [DesertService],
})
export class DesertModule {}
