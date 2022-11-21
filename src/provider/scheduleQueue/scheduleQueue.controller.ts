//import packages
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

//import dtos
import { CreateScheduleDto, UpdateScheduleDto, DeleteScheduleDto } from "../schedule/schedule.dto";
//import services
import { LoggerService } from "src/common/logger/logger.service";
import { ScheduleService } from "../schedule/schedule.service";

//TODO use constants and debug message
@Controller()
export class ScheduleQueueController {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleService: ScheduleService
    ) {
        this.logger.setContext(ScheduleQueueController.name);
    };

    @MessagePattern('ScheduleServcie/ScheduleSetup/create')
    async create(data: CreateScheduleDto) {
        try {
            this.logger.controllerDebug('some');
            await this.scheduleService.create(data);
            return { results: 'Success' };
        } catch (err) {
            throw err;
        };
    };

    @MessagePattern('ScheduleServcie/ScheduleSetup/readAll')
    async readAll() {
        try {
            this.logger.controllerDebug('some');
            await this.scheduleService.readAll();
            return { results: 'Success' };
        } catch (err) {
            throw err;
        };
    };

    @MessagePattern('ScheduleServcie/ScheduleSetup/update')
    async update(data: UpdateScheduleDto) {
        try {
            this.logger.controllerDebug('some');
            await this.scheduleService.update(data);
            return { results: 'Success' };
        } catch (err) {
            throw err;
        };
    };

    @MessagePattern('ScheduleServcie/ScheduleSetup/delete')
    async delete(data: DeleteScheduleDto) {
        try {
            this.logger.controllerDebug('some');
            await this.scheduleService.delete(data);
            return { results: 'Success' };
        } catch (err) {
            throw err;
        };
    };
};