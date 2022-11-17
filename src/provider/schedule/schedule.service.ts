//import packages
import { Injectable, Logger } from '@nestjs/common';

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
    DEBUG_MESSAGE,          //
    DEBUG_MESSAGE_SUCCESS,  //
    CREATE_METHOD,
    READALL_METHOD,
    UPDATE_METHOD,
    DELETE_METHOD,
} = SERVICE;

@Injectable()
export class ScheduleService {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleSetupModel: ScheduleSetupModel,
        private readonly taskService: TaskService
    ) {
        this.logger.setContext(ScheduleService.name);
    }

    async create(data: CreateScheduleDto): Promise<object> {
        try {
            this.logger.serviceDebug(CREATE_METHOD);
            await this.scheduleSetupModel.create(data);
            const target = await this.scheduleSetupModel.read(data);
            this.taskService.create(target);
            return { results: 'Success' };
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async readAll(): Promise<ScheduleSetup[]> {
        try {
            this.logger.serviceDebug(READALL_METHOD);
            return await this.scheduleSetupModel.readAll();
        } catch (err) {
            this.logger.error(err);
            return err;
        }
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
            await this.taskService.update(payload);
            await this.scheduleSetupModel.update(data);
            return { results: 'Success' };
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async delete(data: DeleteScheduleDto): Promise<object> {
        try {
            this.logger.serviceDebug(DELETE_METHOD);
            const target = await this.scheduleSetupModel.read(data);
            const { scheduleName, scheduleType } = target;
            const targetTask = {
                scheduleName: scheduleName,
                scheduleType: scheduleType
            };
            await this.taskService.delete(targetTask);
            await this.scheduleSetupModel.delete(target);
            return { results: 'Success' };
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    // export() {

    // };
};