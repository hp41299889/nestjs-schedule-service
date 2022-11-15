import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleSetup } from './scheduleSetup.entity';
import { ScheduleSetupModelService } from './scheduleSetup.service';

@Module({
    imports: [TypeOrmModule.forFeature([ScheduleSetup], 'postgresConnection')],
    providers: [ScheduleSetupModelService],
    exports: [ScheduleSetupModelService]
})
export class ScheduleSetupModelModule { }