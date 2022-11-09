import { Module } from '@nestjs/common';

import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { ScheduleModelModule } from 'src/model/postgre/schedule/schedule.module';

@Module({
  imports: [RabbitmqModule, ScheduleModelModule],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
