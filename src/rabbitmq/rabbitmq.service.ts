import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

import { PerfectCubicSumDto } from 'src/math/perfectCubicSum.dto';
import { ChildProcessDto } from 'src/childProcess/childProcess.dto';

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject('RabbitmqService') private readonly client: ClientProxy,
    ) { };

    async sendPerfectCubicSum(data: PerfectCubicSumDto) {
        return this.client
            .send('perfectCubicSum', data)
            .pipe(timeout(10000));
    };

    async sendChildProcess(data: ChildProcessDto) {
        return this.client
            .send('childProcess', data)
            .pipe(timeout(10000))
    };
};