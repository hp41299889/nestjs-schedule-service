import { Body, Injectable } from '@nestjs/common';
import { writeFileSync, writeFile, createWriteStream } from 'fs';
import { exec, spawn, fork, execFile } from 'child_process';
import * as iconv from 'iconv-lite';

import { ApiMessageDto, WhisperDto } from './api.dto';
import { CatService } from 'src/mongo/cat/cat.service';
import { CreateCatDto } from 'src/mongo/cat/cat.dto';

@Injectable()
export class ApiService {
    constructor(
        private readonly catService: CatService
    ) { }

    writeJS(data: ApiMessageDto) {
        const { name, message } = data;
        writeFile(`./files/${name}.js`, message, err => {
            console.log('writeFile error', err);
            return this.runNode(data);
        });
    };

    runNode(data: ApiMessageDto) {
        const { name, message } = data;
        //BIG5 is decode to traditional Chinese
        const encoding = 'BIG5';
        const binaryEncoding = 'binary';

        function iconvDecode(str = '') {
            return iconv.decode(Buffer.from(str, binaryEncoding), encoding);
        }
        exec(`node files/${name}.js`, { encoding: 'binary' }, (err, stdout, stderr) => {
            const result = iconvDecode(stdout);
            console.log(result);

        });
        // const node = exec(`cmd`);
        // node.stdout.on('data', (data) => {
        //     console.log(`stdout: ${data}`);
        // });

        // node.stderr.on('data', (data) => {
        //     console.error(`stderr: ${data}`);
        // });

        // node.on('close', (code) => {
        //     console.log(`child process exit code: ${code}`);
        // });
        // console.log(process.platform);
    };

    handleWhisper(data: WhisperDto) {
        const { name, age, sex, message } = data;
        return `Hi ${name}, here is NestJS, your age is ${age} and sex is ${sex}, you said ${message}`;
    };

    async catCreate(createCatDto: CreateCatDto) {
        await this.catService.create(createCatDto);
    };

    async catFindAll() {
        return this.catService.findAll();
    };
};