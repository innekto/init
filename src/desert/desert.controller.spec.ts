import { Test, TestingModule } from '@nestjs/testing';
import { DesertController } from './desert.controller';
import { DesertService } from './desert.service';

describe('DesertController', () => {
  let controller: DesertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesertController],
      providers: [DesertService],
    }).compile();

    controller = module.get<DesertController>(DesertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
