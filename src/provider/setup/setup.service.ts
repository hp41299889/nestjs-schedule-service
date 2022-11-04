import { Injectable } from '@nestjs/common';
import { ProstgreService } from 'src/database/postgre/postgre.service';

import { PostgreConnectTestSetupDto, MongoConnectTestSetupDto } from './setup.dto';

@Injectable()
export class SetupService {
    // constructor(
    //     private readonly postgreService: ProstgreService
    // ) { };
    read() {
        //TODO
    };

    postgreConnectTest(data: PostgreConnectTestSetupDto) {
        //TODO
    };

    mongoConnectTest(data: MongoConnectTestSetupDto) {
        //TODO
    };

    save() {
        //TODO
    };
};