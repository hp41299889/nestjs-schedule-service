import { CreateScheduleDto } from "../schedule/schedule.dto";

export class MessageMQCLIDto {
    jsonrpc: string;
    method: string;
    params: object;
    id: number;
    cmd: string;
};

export class SendMessageDto {
    pattern: string;
    message: CreateScheduleDto;
};

export class BuildMessageDto extends SendMessageDto {

};