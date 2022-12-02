import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, MongooseHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private mongoose: MongooseHealthIndicator,
        @InjectConnection('mongoConnection')
        private mongoTest: Connection
    ) { }

    @Get()
    @HealthCheck()
    mongooseCheck() {
        return this.health.check([
            () => this.mongoose.pingCheck('mongoConnection', { connection: this.mongoTest })
        ]);
    }
};