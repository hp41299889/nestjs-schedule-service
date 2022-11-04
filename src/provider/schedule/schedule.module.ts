import { Module } from '@nestjs/common';

import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
