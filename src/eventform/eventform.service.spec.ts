import { Test, TestingModule } from '@nestjs/testing';
import { EventformService } from './eventform.service';

describe('EventformService', () => {
  let service: EventformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventformService],
    }).compile();

    service = module.get<EventformService>(EventformService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
