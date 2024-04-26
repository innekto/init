import { Test, TestingModule } from '@nestjs/testing';
import { WhatIsDoneController } from './what-is-done.controller';
import { WhatIsDoneService } from './what-is-done.service';

describe('WhatIsDoneController', () => {
  let controller: WhatIsDoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhatIsDoneController],
      providers: [WhatIsDoneService],
    }).compile();

    controller = module.get<WhatIsDoneController>(WhatIsDoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
