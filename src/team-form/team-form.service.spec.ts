import { Test, TestingModule } from '@nestjs/testing';
import { TeamFormService } from './team-form.service';

describe('TeamFormService', () => {
  let service: TeamFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamFormService],
    }).compile();

    service = module.get<TeamFormService>(TeamFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
