import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqClientController } from './rabbitmq-client.controller';

describe('RabbitmqClientController', () => {
  let controller: RabbitmqClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RabbitmqClientController],
    }).compile();

    controller = module.get<RabbitmqClientController>(RabbitmqClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
