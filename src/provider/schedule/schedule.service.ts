//import packages
import { Injectable, Logger } from '@nestjs/common';

//import constants
import { SERVICE } from './schedule.constants';
//import dtos
import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
//import models
import { ScheduleSetup } from 'src/model/postgre/scheduleSetup/scheduleSetup.entity';
//import services
import { TaskService } from '../task/task.service';
import { ScheduleSetupModelService } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';

const {
    DEBUG_MESSAGE,          //
    DEBUG_MESSAGE_SUCCESS,  //
    CREATE_FUNCTION,        //
    READALL_FUNCTION,       //
    UPDATE_FUNCTION,        //
    DELETE_FUNCTION         //
} = SERVICE;

@Injectable()
export class ScheduleService {
    constructor(
        private readonly scheduleModelService: ScheduleSetupModelService,
        private readonly taskService: TaskService
    ) { }

    private readonly logger = new Logger(ScheduleService.name);

    async create(data: CreateScheduleDto): Promise<object> {
        this.logger.debug(`${DEBUG_MESSAGE} ${CREATE_FUNCTION}`);
        try {
            await this.scheduleModelService.create(data);
            const target = await this.scheduleModelService.read(data);
            this.taskService.create(target);
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${CREATE_FUNCTION}`);
            return { results: 'Success' };
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async readAll(): Promise<ScheduleSetup[]> {
        this.logger.debug(`${DEBUG_MESSAGE} ${READALL_FUNCTION}`);
        try {
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${READALL_FUNCTION}`);
            return await this.scheduleModelService.readAll();
        } catch (err) {
            this.logger.error(err);
            return err;
        }
    };

    async update(data: UpdateScheduleDto): Promise<object> {
        this.logger.debug(`${DEBUG_MESSAGE} ${UPDATE_FUNCTION}`);
        const { scheduleID } = data;
        try {
            const target = await this.scheduleModelService.read({ scheduleID });
            const payload = {
                oldTask: target,
                newData: data
            }
            await this.taskService.update(payload);
            await this.scheduleModelService.update(data);
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${UPDATE_FUNCTION}`);
            return { results: 'Success' };
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async delete(data: DeleteScheduleDto): Promise<object> {
        this.logger.debug(`${DEBUG_MESSAGE} ${DELETE_FUNCTION}`);
        try {
            const target = await this.scheduleModelService.read(data);
            const { scheduleName, scheduleType } = target;
            const targetTask = {
                scheduleName: scheduleName,
                scheduleType: scheduleType
            };
            await this.taskService.delete(targetTask);
            await this.scheduleModelService.delete(target);
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${DELETE_FUNCTION}`);
            return { results: 'Success' };
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    // export() {

    // };
};