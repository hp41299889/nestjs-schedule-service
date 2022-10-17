import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

import { ApiService } from './api.service';
import { ApiMessageDto, WhisperDto } from './api.dto';

@Controller('/v1')
export class ApiController {
    constructor(
        private readonly service: ApiService
    ) { }

    @Post('/message')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: './upload',
                filename(req, file, callback) {
                    const name = file.originalname;
                    callback(null, name);
                },
            })
        }))
    postMessage(@Body() data: ApiMessageDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        console.log('data', data);
        console.log('files', files);

        return this.service.writeJS(data);
    };

    @Post('/whisper')
    postWhisper(@Body() data: WhisperDto) {
        return this.service.handleWhisper(data);
    };
};