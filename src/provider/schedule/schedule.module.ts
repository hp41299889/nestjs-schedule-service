import { Module } from '@nestjs/common';

import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [ScheduleSetupModelModule, TaskModule],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
