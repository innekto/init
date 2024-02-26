import { Module } from '@nestjs/common';
import { WhatIsDoneService } from './what-is-done.service';
import { WhatIsDoneController } from './what-is-done.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatIsDone } from './entities/what-is-done.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhatIsDone, Category])],
  controllers: [WhatIsDoneController],
  providers: [WhatIsDoneService, CloudinaryService],
})
export class WhatIsDoneModule {}
