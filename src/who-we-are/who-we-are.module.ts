import { Module } from '@nestjs/common';
import { WhoWeAreService } from './who-we-are.service';
import { WhoWeAreController } from './who-we-are.controller';
import { WhoWeAre } from './entities/who-we-are.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhoWeAre])],
  controllers: [WhoWeAreController],
  providers: [WhoWeAreService, CloudinaryService],
})
export class WhoWeAreModule {}
