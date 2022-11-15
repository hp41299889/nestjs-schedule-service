import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

import { SaveSetupDto } from 'src/provider/setup/setup.dto';

@Injectable()
export class JsonService {
    constructor(

    ) { };

    private readonly logger = new Logger(JsonService.name);
    private readonly configFile = join(__dirname, '..', '..', '..', 'setup', 'setup.json');

    readAll() {
        try {
            return fs.readFileSync(this.configFile, 'utf8');
        } catch (err) {
            return err;
        };
    };

    read(data: string) {
        try {
            const config: SaveSetupDto = JSON.parse(this.readAll());
            return config[data];
        } catch (err) {
            return err;
        }
    };

    async save(data: SaveSetupDto) {
        try {
            let config = JSON.parse(this.readAll());
            Object.keys(data).map(key => {
                config[key] = data[key];
            });
            fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
            this.logger.debug('new config', config);
            return { results: 'Success' };
        } catch (err) {
            return err;
        };
    };
};