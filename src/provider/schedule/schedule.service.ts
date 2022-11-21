//import packages
import { Injectable } from '@nestjs/common';

//import constants
import { SERVICE } from './schedule.constants';
//import dtos
import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
//import models
import { ScheduleSetup } from 'src/model/postgre/scheduleSetup/scheduleSetup.entity';
import { ScheduleSetupModel } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';
//import services
import { TaskService } from '../task/task.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    CREATE_METHOD,  //create()
    READALL_METHOD, //readAll()
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

    async create(data: CreateScheduleDto): Promise<object> {
        try {
            this.logger.serviceDebug(CREATE_METHOD);
            await this.scheduleSetupModel.create(data);
            const target = await this.scheduleSetupModel.read(data);
            const task = {
                pattern: 'create',
                ...target
            };
            this.taskService.create(task);
            return { results: 'Success' };
        } catch (err) {
            throw err;
        };
    };

    async readAll(): Promise<ScheduleSetup[]> {
        try {
            this.logger.serviceDebug(READALL_METHOD);
            return await this.scheduleSetupModel.readAll();
        } catch (err) {
            throw err;
        };
    };

    async update(data: UpdateScheduleDto): Promise<object> {
        try {
            this.logger.serviceDebug(UPDATE_METHOD);
            const { scheduleID } = data;
            const target = await this.scheduleSetupModel.read({ scheduleID });
            const payload = {
                oldTask: target,
                newData: data
            };
            await this.scheduleSetupModel.update(data);
            const task = {
                pattern: 'update',
                ...payload
            };
            await this.taskService.update(task);
            return { results: 'Success' };
        } catch (err) {
            throw err;
        };
    };

    async delete(data: DeleteScheduleDto): Promise<object> {
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
            const task = {
                pattern: 'delete',
                ...targetTask
            };
            await this.taskService.delete(task);
            return { results: 'Success' };
        } catch (err) {
            throw err;
        };
    };
};