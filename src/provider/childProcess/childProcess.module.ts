import { Module } from '@nestjs/common';

import { ChildProcessService } from './childProcess.service';
import { ChildProcessController } from './childProcess.controller';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule],
  providers: [ChildProcessService],
  controllers: [ChildProcessController]
})
export class ChildProcessModule { }
