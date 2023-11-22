import { Test, TestingModule } from '@nestjs/testing';
import { DesertService } from './desert.service';

describe('DesertService', () => {
  let service: DesertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesertService],
    }).compile();

    service = module.get<DesertService>(DesertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
