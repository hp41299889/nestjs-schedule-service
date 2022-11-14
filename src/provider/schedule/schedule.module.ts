import { Module } from '@nestjs/common';

import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleModelModule } from 'src/model/postgre/schedule/schedule.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [ScheduleModelModule, TaskModule],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
