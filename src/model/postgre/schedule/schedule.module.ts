import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModelService } from './schedule.service';
import { Schedule } from './schedule.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule], 'postgresConnection')],
    providers: [ScheduleModelService],
    exports: [ScheduleModelService]
})
export class ScheduleModelModule { }