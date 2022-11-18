export class MessageMQCLIDto {
    jsonrpc: string;
    method: string;
    params: object;
    id: number;
    cmd: string;
};

export class BuildMessageDto {
    method: string;
    message?: any;
};

export class SendMessageDto {
    pattern: string;
    message?: any;
};