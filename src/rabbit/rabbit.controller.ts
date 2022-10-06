import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { timeout } from 'rxjs';

import { RabbitService } from './rabbit.service';

@Controller('rabbit')
export class RabbitController {
    constructor(private readonly rabbitService: RabbitService) { }

    @MessagePattern({ cmd: 'greeting' })
    getGreetingMessage(name: string): string {
        timeout(3000)
        return `Hello ${name}`;
    }

    @MessagePattern({ cmd: 'greeting-async' })
    async getGreetingMessageAysnc(name: string): Promise<string> {
        return `Hello ${name} Async`;
    }

    @EventPattern('book-created')
    async handleBookCreatedEvent(data: Record<string, unknown>) {
        console.log(data);
    }

    @MessagePattern({ cmd: 'greeting' })
    postGreetingMessage(message: any): string {
        return `Hello ${message?.name}, I'm RabbitMQ, you said ${message?.message}`;
    }

    @Get("/greeting")
    async getHello() {
        return this.rabbitService.getHello();
    }

    @Get("/greeting-async")
    async getHelloAsync() {
        return this.rabbitService.getHelloAsync();
    }

    @Get("/publish-event")
    async publishEvent() {
        this.rabbitService.publishEvent();
    }

    @Post("/greeting")
    async postMessage(@Body() body: any) {
        return this.rabbitService.postMessage(body?.name, body?.message);
    };
}
