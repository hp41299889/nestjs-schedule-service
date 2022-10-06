import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitService {
    constructor(@Inject('danny_service') private client: ClientProxy) { }

    async getHello() {
        return this.client.send({ cmd: 'greeting' }, 'a lo ha');
    };

    async getHelloAsync() {
        const message = this.client.send({ cmd: 'greeting-async' }, 'Progressive Coder');
        return message;
    };

    async publishEvent() {
        this.client.emit('book-created', { 'bookName': 'The Way Of Kings', 'author': 'Brandon Sanderson' });
    };

    async postMessage(name: string, message: string) {
        return this.client.send({ cmd: 'greeting' }, { name: name, message: message });
    };
};
