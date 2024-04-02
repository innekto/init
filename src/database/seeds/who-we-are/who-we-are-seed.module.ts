import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhoWeAre } from 'src/who-we-are/entities/who-we-are.entity';
import { WhoWeAreSeedService } from './who-we-are-seed.service';
import { Image } from 'src/image/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhoWeAre, Image])],
  providers: [WhoWeAreSeedService],
  exports: [WhoWeAreSeedService],
})
export class WhoWeAreSeedModule {}
