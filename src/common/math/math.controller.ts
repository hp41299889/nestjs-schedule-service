import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { PerfectCubicSumDto } from './math.dto';
import { MathService } from './math.service';

@Controller()
export class MathController {
    constructor(
        private readonly mathService: MathService
    ) { };


    private id: number = 0;
    private reqNo: number = 0;

    @Post('/perfectcubicsum')
    @ApiOperation({ summary: 'POST a and b as a number to middleservice to calculate perfect cubic sum' })
    async PostPerfectCubicSum(@Body() data: PerfectCubicSumDto) {
        this.reqNo++;
        data.reqNo = this.reqNo;
        return await this.mathService.perfectCubicSum(data);
    };

};