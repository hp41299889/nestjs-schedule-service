//import dtos
import { CreateScheduleDto } from "../schedule/schedule.dto";
import { ResendMonitorDto } from "../monitor/monitor.dto";

export class JsonrpcMessageDto {
    jsonrpc: string;
    method: string;
    params: object;
    id: number;
};

export class SendMessageDto {
    pattern: string;
    message: CreateScheduleDto | ResendMonitorDto;
};

export class BuildMessageDto extends SendMessageDto {

};