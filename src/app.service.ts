import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { map } from 'rxjs';

import { PerfectCubicSumDto } from './math/cubicSum.dto';

@Injectable()
export class AppService {
    constructor(
        private readonly httpService: HttpService
    ) { };

    cubicSum(data: PerfectCubicSumDto) {
        const url = 'http://localhost:3001/rabbitmq/perfectcubicsum';
        return this.httpService.post(url, data)
            .pipe(
                map(res => res.data)
            )
    };
};