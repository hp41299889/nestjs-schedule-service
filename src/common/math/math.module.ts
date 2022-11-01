import { Module } from '@nestjs/common';
import { RabbitmqModule } from 'src/provider/rabbitmq/rabbitmq.module';
import { MathController } from './math.controller';
import { MathService } from './math.service';

@Module({
    imports: [RabbitmqModule],
    controllers: [MathController],
    providers: [MathService],
})
export class MathModule { };