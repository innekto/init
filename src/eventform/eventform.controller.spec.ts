import { Test, TestingModule } from '@nestjs/testing';
import { EventformController } from './eventform.controller';
import { EventformService } from './eventform.service';

describe('EventformController', () => {
  let controller: EventformController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventformController],
      providers: [EventformService],
    }).compile();

    controller = module.get<EventformController>(EventformController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
