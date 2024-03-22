import { Test, TestingModule } from '@nestjs/testing';
import { TeamFormController } from './team-form.controller';
import { TeamFormService } from './team-form.service';

describe('TeamFormController', () => {
  let controller: TeamFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamFormController],
      providers: [TeamFormService],
    }).compile();

    controller = module.get<TeamFormController>(TeamFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
