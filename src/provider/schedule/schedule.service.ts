import { Injectable } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
import * as CONST from './schedule.constants';

@Injectable()
export class ScheduleService {
    constructor(
        private readonly rabbitmqService: RabbitmqService
    ) { }

    private readonly baseMethod = CONST.BASEMETHOD;

    create(data: CreateScheduleDto) {
        const cmd = CONST.CREATE;
        return this.rabbitmqService.buildMessage(cmd, this.baseMethod, data);
    };

    readAll() {
        const cmd = CONST.READALL;
        return this.rabbitmqService.buildMessage(cmd, this.baseMethod);
    };

    update(data: UpdateScheduleDto) {
        const cmd = CONST.UPDATE;
        return this.rabbitmqService.buildMessage(cmd, this.baseMethod, data);
    };

    delete(data: DeleteScheduleDto) {
        const cmd = CONST.DELETE;
        return this.rabbitmqService.buildMessage(cmd, this.baseMethod, data);
    };

    export() {

    };
};