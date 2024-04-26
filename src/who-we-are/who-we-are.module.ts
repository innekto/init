import { Module } from '@nestjs/common';
import { WhoWeAreService } from './who-we-are.service';
import { WhoWeAreController } from './who-we-are.controller';
import { WhoWeAre } from './entities/who-we-are.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhoWeAre, Image])],
  controllers: [WhoWeAreController],
  providers: [WhoWeAreService, CloudinaryService, ImageService],
})
export class WhoWeAreModule {}
