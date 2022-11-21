//import packages
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

//import constants
import { SERVICE } from './json.constants';
//import dtos
import { SaveSetupDto } from 'src/provider/setup/setup.dto';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    READALL_METHOD, //readAll()
    READ_METHOD,    //read()
    SAVE_METHOD,    //save()
} = SERVICE;

@Injectable()
export class JsonService {
    constructor(
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(JsonService.name);
    };
    private readonly configFile = join(__dirname, '..', '..', '..', 'setup', 'setup.json');

    async readAll(): Promise<string> {
        try {
            this.logger.serviceDebug(READALL_METHOD);
            return fs.readFileSync(this.configFile, 'utf8');
        } catch (err) {
            throw err;
        };
    };

    async read<T>(data: string): Promise<T> {
        try {
            this.logger.serviceDebug(READ_METHOD);
            const config: SaveSetupDto = JSON.parse(await this.readAll());
            return config[data];
        } catch (err) {
            throw err;
        };
    };

    async save(data: SaveSetupDto): Promise<void> {
        try {
            this.logger.serviceDebug(SAVE_METHOD);
            let config = JSON.parse(await this.readAll());
            Object.keys(data).map(key => {
                config[key] = data[key];
            });
            fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
        } catch (err) {
            throw err;
        };
    };
};