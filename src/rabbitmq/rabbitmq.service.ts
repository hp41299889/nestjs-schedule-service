import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

import { PerfectCubicSumDto } from 'src/math/perfectCubicSum.dto';

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject('RabbitmqService') private readonly client: ClientProxy,
    ) { };

    async sendPerfectCubicSum(data: PerfectCubicSumDto) {
        console.log(this.client);

        return this.client
            .send('perfectCubicSum', data)
            .pipe(timeout(5000));
    };
};