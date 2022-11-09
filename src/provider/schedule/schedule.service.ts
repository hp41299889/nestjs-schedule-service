import { Injectable, Logger } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
import * as CONST from './schedule.constants';
import { ScheduleModelService } from 'src/model/postgre/schedule/schedule.service';

@Injectable()
export class ScheduleService {
    constructor(
        private readonly rabbitmqService: RabbitmqService,
        private readonly scheduleModelService: ScheduleModelService,
    ) { }

    private readonly baseMethod = CONST.BASEMETHOD;
    private readonly logger = new Logger(ScheduleService.name);
    private readonly debugMessage = 'Calling scheduleModelService.';

    create(data: CreateScheduleDto) {
        try {
            this.logger.debug(`${this.debugMessage}create()`);
            return this.scheduleModelService.create(data);
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    readAll() {
        try {
            this.logger.debug(`${this.debugMessage}readAll()`);
            return this.scheduleModelService.readAll();
        } catch (err) {
            this.logger.error(err);
            return err;
        }
    };

    update(data: UpdateScheduleDto) {
        try {
            this.logger.debug(`${this.debugMessage}update()`);
            return this.scheduleModelService.update(data);
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    delete(data: DeleteScheduleDto) {
        try {
            this.logger.debug(`${this.debugMessage}delete()`);
            return this.scheduleModelService.delete(data);
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    export() {

    };
};