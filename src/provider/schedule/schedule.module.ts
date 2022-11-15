import { Module } from '@nestjs/common';

import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
import { TaskModule } from '../task/task.module';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [ScheduleSetupModelModule, TaskModule],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
