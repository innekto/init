import { Test, TestingModule } from '@nestjs/testing';
import { BusinessFormController } from './business-form.controller';
import { BusinessFormService } from './business-form.service';

describe('BusinessFormController', () => {
  let controller: BusinessFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessFormController],
      providers: [BusinessFormService],
    }).compile();

    controller = module.get<BusinessFormController>(BusinessFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
