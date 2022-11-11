import { ApiProperty } from "@nestjs/swagger";



export class MessageMQCLIDto {
    jsonrpc: string;
    method: string;
    params: object;
    id: number;
    cmd: string;
};