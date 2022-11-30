import { ClientRMQ } from "@nestjs/microservices";

export class ScheduleClient extends ClientRMQ {
    connection = this.connection;
    async connect(): Promise<any> {
        console.log('connect');
    };
};