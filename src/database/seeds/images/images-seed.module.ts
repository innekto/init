import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Image } from 'src/image/entities/image.entity';
import { ImageSeedService } from './images-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageSeedService],
  exports: [ImageSeedService],
})
export class ImageSeedModule {}
