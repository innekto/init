import { Test, TestingModule } from '@nestjs/testing';
import { WhatIsDoneService } from './what-is-done.service';

describe('WhatIsDoneService', () => {
  let service: WhatIsDoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhatIsDoneService],
    }).compile();

    service = module.get<WhatIsDoneService>(WhatIsDoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
