import { Test, TestingModule } from '@nestjs/testing';
import { WhoWeAreService } from './who-we-are.service';

describe('WhoWeAreService', () => {
  let service: WhoWeAreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhoWeAreService],
    }).compile();

    service = module.get<WhoWeAreService>(WhoWeAreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
