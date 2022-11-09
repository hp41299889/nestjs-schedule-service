import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

import { ProstgreService } from 'src/database/postgres/postgres.service';
import { PostgreConnectTestSetupDto, MongoConnectTestSetupDto, SaveSetupDto } from './setup.dto';

@Injectable()
export class SetupService {
    constructor(
        // private readonly postgreService: ProstgreService
    ) { };
    read() {
        //TODO
    };

    postgreConnectTest(data: PostgreConnectTestSetupDto) {
        //TODO
    };

    mongoConnectTest(data: MongoConnectTestSetupDto) {
        //TODO
    };

    async save(data: SaveSetupDto) {
        //TODO
        // const f = fs.readFileSync(join(__dirname + '../../' + '.env'));
        // const origin = fs.readFileSync('./.env', 'utf8');
        // console.log(data);  


    };
};