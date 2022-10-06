import { Test, TestingModule } from '@nestjs/testing';
import { ThingsboardService } from './thingsboard.service';

describe('ThingboardService', () => {
  let service: ThingsboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThingsboardService],
    }).compile();

    service = module.get<ThingsboardService>(ThingsboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
