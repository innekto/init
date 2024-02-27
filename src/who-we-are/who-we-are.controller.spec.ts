import { Test, TestingModule } from '@nestjs/testing';
import { WhoWeAreController } from './who-we-are.controller';
import { WhoWeAreService } from './who-we-are.service';

describe('WhoWeAreController', () => {
  let controller: WhoWeAreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhoWeAreController],
      providers: [WhoWeAreService],
    }).compile();

    controller = module.get<WhoWeAreController>(WhoWeAreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
