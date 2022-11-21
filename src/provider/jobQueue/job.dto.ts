import { CreateScheduleDto } from "../schedule/schedule.dto";

export class JsonrpcMessageDto {
    jsonrpc: string;
    method: string;
    params: object;
    id: number;
};

export class SendMessageDto {
    pattern: string;
    message: CreateScheduleDto;
};

export class BuildMessageDto extends SendMessageDto {

};