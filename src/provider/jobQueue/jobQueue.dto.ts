export class JsonrpcMessageDto {
    jsonrpc: string;
    method: string;
    params: object;
    id?: number;
};

export class SendMessageDto extends JsonrpcMessageDto {

};

export class BuildMessageDto extends SendMessageDto {

};