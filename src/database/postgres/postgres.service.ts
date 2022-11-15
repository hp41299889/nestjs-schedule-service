import { Injectable } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';

import { createConnection, ConnectionManager } from 'typeorm';

@Injectable()
export class ProstgreService {
    create() {
        const test = getDataSourceToken();
        console.log(test);

    }
};