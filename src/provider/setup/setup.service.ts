import { Injectable, Logger } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import pm2 from 'pm2';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';

import { ProstgreService } from 'src/database/postgres/postgres.service';
import { PostgreConnectTestSetupDto, MongoConnectTestSetupDto, SaveSetupDto } from './setup.dto';
import { log } from 'console';
import { JsonService } from 'src/config/json/json.service';

@Injectable()
export class SetupService {
    constructor(
        // private readonly postgreService: ProstgreService
        private readonly jsonService: JsonService

    ) { };

    private readonly logger = new Logger(SetupService.name);

    read() {
        //TODO
    };

    postgreConnectTest(data: PostgreConnectTestSetupDto) {
        //TODO
    };

    mongoConnectTest(data: MongoConnectTestSetupDto) {
        //TODO
        console.log(this.jsonService);
        return this.jsonService;
    };

    async save(data: SaveSetupDto) {
        try {
            this.logger.debug('Calling jsonService.save()');
            return this.jsonService.save(data);
        } catch (err) {
            this.logger.error(err);
            return err;
        }








        // this.restart();
    };

    async restart() {
        pm2.connect(err => {
            if (err) {
                console.log(err);
                process.exit(2);
            };
            pm2.start({
                script: 'dist/main.js',
                name: 'server',
            }, (err, apps) => {
                if (err) {
                    console.error(err);
                    return pm2.disconnect();
                };

                pm2.list((err, list) => {
                    console.log(err, list);

                    pm2.restart('server', (err, proc) => {
                        pm2.disconnect();
                    });
                });
            });
        });
    };
};