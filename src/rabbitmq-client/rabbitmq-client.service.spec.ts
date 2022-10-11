import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqClientService } from './rabbitmq-client.service';

describe('RabbitmqClientService', () => {
  let service: RabbitmqClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitmqClientService],
    }).compile();

    service = module.get<RabbitmqClientService>(RabbitmqClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
