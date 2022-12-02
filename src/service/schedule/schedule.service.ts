//import packages
import { Injectable } from '@nestjs/common';

//import constants
import { SERVICE } from './schedule.constants';
//import dtos
import { CreateScheduleDto, DeleteScheduleDto, ReadScheduleDto, UpdateScheduleDto, ScheduleSetupsDto } from './schedule.dto';
//import models
import { ScheduleSetup } from 'src/model/postgre/scheduleSetup/scheduleSetup.entity';
import { ScheduleSetupModel } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';
//import services
import { TaskService } from '../../provider/task/task.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { JsonrpcMessageDto } from '../../provider/jobQueue/jobQueue.dto';

const {
    CREATE_METHOD,  //create()
    READALL_METHOD, //readAll()
    READ_METHOD,    //read()
    UPDATE_METHOD,  //update()
    DELETE_METHOD,  //delete()
} = SERVICE;

@Injectable()
export class ScheduleService {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleSetupModel: ScheduleSetupModel,
        private readonly taskService: TaskService
    ) {
        this.logger.setContext(ScheduleService.name);
    };

    async create(data: CreateScheduleDto): Promise<void> {
        try {
            this.logger.serviceDebug(CREATE_METHOD);
            const { MQCLI } = data;
            if (typeof (MQCLI) === 'string') {
                data.MQCLI = JSON.parse(MQCLI);
            };
            const schedule = await this.scheduleSetupModel.create(data);
            const target = await this.scheduleSetupModel.read(schedule);
            this.taskService.create(target);
        } catch (err) {
            throw err;
        };
    };

    async readAll(): Promise<ScheduleSetupsDto[]> {
        try {
            this.logger.serviceDebug(READALL_METHOD);
            const rows = await this.scheduleSetupModel.readAll();
            const schedules = rows.map(row => {
                return {
                    ...row,
                    MQCLI: JSON.stringify(row.MQCLI)
                };
            });
            return schedules;
        } catch (err) {
            throw err;
        };
    };

    async read(data: ReadScheduleDto): Promise<ScheduleSetup> {
        try {
            this.logger.serviceDebug(READALL_METHOD);
            return await this.scheduleSetupModel.read(data);
        } catch (err) {
            throw err;
        };
    };

    async update(data: UpdateScheduleDto): Promise<void> {
        try {
            this.logger.serviceDebug(UPDATE_METHOD);
            const { scheduleID, MQCLI } = data;
            const target = await this.scheduleSetupModel.read({ scheduleID });
            const payload = {
                oldTask: target,
                newData: data
            };
            if (typeof (MQCLI) === 'string') {
                data.MQCLI = JSON.parse(MQCLI);
            };
            await this.scheduleSetupModel.update(data);
            await this.taskService.update(payload);
        } catch (err) {
            throw err;
        };
    };

    async delete(data: DeleteScheduleDto): Promise<void> {
        try {
            this.logger.serviceDebug(DELETE_METHOD);
            const target = await this.scheduleSetupModel.read(data);
            const { scheduleName, scheduleType, cycle, regular } = target;
            const targetTask = {
                scheduleName: scheduleName,
                scheduleType: scheduleType,
                cycle: cycle,
                regular: regular
            };
            await this.scheduleSetupModel.delete(target);
            await this.taskService.delete(targetTask);
        } catch (err) {
            throw err;
        };
    };
};