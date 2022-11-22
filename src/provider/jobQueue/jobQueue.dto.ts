//import dtos
import { CreateScheduleDto } from "../schedule/schedule.dto";
import { ResendMonitorDto } from "../monitor/monitor.dto";

export class JsonrpcMessageDto {
    jsonrpc: string;
    method: string;
    params: object;
    id?: number;
};

export class SendMessageDto extends JsonrpcMessageDto {
    // pattern: string;
    // message: JsonrpcMessageDto;
};

export class BuildMessageDto extends SendMessageDto {

};