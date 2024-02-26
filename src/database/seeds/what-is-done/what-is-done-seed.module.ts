import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { WhatIsDone } from 'src/what-is-done/entities/what-is-done.entity';
import { WhatIsDoneSeedService } from './what-is-done-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhatIsDone, Category])],
  providers: [WhatIsDoneSeedService],
  exports: [WhatIsDoneSeedService],
})
export class WhatIsDoneSeedModule {}
