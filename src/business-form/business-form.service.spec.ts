import { Test, TestingModule } from '@nestjs/testing';
import { BusinessFormService } from './business-form.service';

describe('BusinessFormService', () => {
  let service: BusinessFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessFormService],
    }).compile();

    service = module.get<BusinessFormService>(BusinessFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
