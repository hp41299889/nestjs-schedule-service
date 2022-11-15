import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleSetupModelService } from './scheduleSetup.service';
import { ScheduleSetup } from './scheduleSetup.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ScheduleSetup])],
    providers: [ScheduleSetupModelService],
    exports: [ScheduleSetupModelService]
})
export class ScheduleSetupModelModule { }