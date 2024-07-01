import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhoWeAre } from 'src/who-we-are/entities/who-we-are.entity';
import { WhoWeAreSeedService } from './who-we-are-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhoWeAre])],
  providers: [WhoWeAreSeedService],
  exports: [WhoWeAreSeedService],
})
export class WhoWeAreSeedModule {}
