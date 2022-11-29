//import packages
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

//import constants
import { SERVICE } from './scheduleSetup.constants';
//import dtos
import { CreateScheduleDto, ReadScheduleDto, UpdateScheduleDto } from 'src/service/schedule/schedule.dto';
//import models
import { ScheduleSetup } from './scheduleSetup.entity';
//import services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    CONNECTION_NAME,    //connection name for TypeOrmModule to postgres
    CREATE_METHOD,      //create()
    READALL_METHOD,     //readAll()
    READ_METHOD,        //read()
    UPDATE_METHOD,      //update()
    DELETE_METHOD,      //delete()
} = SERVICE;

@Injectable()
export class ScheduleSetupModel {
    constructor(
        @InjectDataSource(CONNECTION_NAME)
        private datasource: DataSource,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(ScheduleSetupModel.name);
    };

    async create(data: CreateScheduleDto): Promise<ScheduleSetup> {
        try {
            this.logger.serviceDebug(CREATE_METHOD);
            const { commandSource, scheduleName, scheduleType, regular, cycle, MQCLI } = data;
            const schedule = new ScheduleSetup();
            schedule.createDatetime = new Date();
            schedule.lastEditDatetime = new Date();
            schedule.commandSource = commandSource;
            schedule.scheduleName = scheduleName;
            schedule.scheduleType = scheduleType;
            schedule.regular = regular;
            schedule.cycle = cycle;
            schedule.MQCLI = MQCLI;
            return await this.datasource.manager.save(schedule);
        } catch (err) {
            throw err;
        };
    };

    async readAll(): Promise<ScheduleSetup[]> {
        try {
            this.logger.serviceDebug(READALL_METHOD);
            const rows = await this.datasource.manager.find(ScheduleSetup);
            return rows;
        } catch (err) {
            throw err;
        };
    };

    async read(data: ReadScheduleDto): Promise<ScheduleSetup> {
        try {
            this.logger.serviceDebug(READ_METHOD);
            const { scheduleID } = data;
            const schedule = new ScheduleSetup();
            schedule.scheduleID = scheduleID;
            const row = await this.datasource.manager.findOneBy(ScheduleSetup, data);
            return row;
        } catch (err) {
            throw err;
        };
    };

    async update(data: UpdateScheduleDto): Promise<void> {
        try {
            this.logger.serviceDebug(UPDATE_METHOD);
            const { scheduleID, commandSource, scheduleName, scheduleType, regular, cycle, MQCLI } = data;
            const schedule = new ScheduleSetup();
            schedule.scheduleID = scheduleID;
            const target = await this.datasource.manager.findOneBy(ScheduleSetup, { scheduleID });
            target.createDatetime = target.createDatetime;
            target.lastEditDatetime = new Date();
            target.commandSource = commandSource;
            target.scheduleName = scheduleName;
            target.scheduleType = scheduleType;
            target.MQCLI = MQCLI;
            if (target.scheduleType === 'cycle') {
                target.cycle = cycle;
                target.regular = null;
            } else if (target.scheduleType === 'regular') {
                target.regular = regular;
                target.cycle = null;
            };
            await this.datasource.manager.save(target);
        } catch (err) {
            throw err;
        };
    };

    async delete(data: ScheduleSetup): Promise<void> {
        try {
            this.logger.serviceDebug(DELETE_METHOD);
            await this.datasource.manager.remove(data);
        } catch (err) {
            throw err;
        };
    };
};