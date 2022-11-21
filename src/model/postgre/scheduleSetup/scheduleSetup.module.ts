//import packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';

//import constants
import { MODULE } from './scheduleSetup.constants';
//import models
import { ScheduleSetup } from './scheduleSetup.entity';
//import services
import { ScheduleSetupModel } from './scheduleSetup.service';

const {
    CONNECTION_NAME,    //connection name for TypeOrmModule to postgres
} = MODULE;

@Module({
    imports: [
        LoggerModule,
        TypeOrmModule.forFeature([ScheduleSetup], CONNECTION_NAME)
    ],
    providers: [ScheduleSetupModel],
    exports: [ScheduleSetupModel]
})
export class ScheduleSetupModelModule { }