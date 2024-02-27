import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { WhatIsDoneSeedService } from './what-is-done/what-is-done-seed.service';
import { CategorySeedService } from './category/category-seed.service';
import { AdminSeedService } from './admin/admin-seed.service';
import { WhoWeAreSeedService } from './who-we-are/who-we-are-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(CategorySeedService).run();
  await app.get(WhatIsDoneSeedService).run();
  await app.get(AdminSeedService).run();
  await app.get(WhoWeAreSeedService).run();

  await app.close();
};

void runSeed();
