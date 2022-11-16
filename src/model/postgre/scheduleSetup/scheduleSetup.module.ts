//import packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//import constants
import { MODULE } from './scheduleSetup.constants';
//import models
import { ScheduleSetup } from './scheduleSetup.entity';
//import services
import { ScheduleSetupModelService } from './scheduleSetup.service';

const {
    CONNECTION_NAME,    //
} = MODULE;

@Module({
    imports: [TypeOrmModule.forFeature([ScheduleSetup], CONNECTION_NAME)],
    providers: [ScheduleSetupModelService],
    exports: [ScheduleSetupModelService]
})
export class ScheduleSetupModelModule { }