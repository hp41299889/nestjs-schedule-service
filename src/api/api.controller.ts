import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

import { ApiService } from './api.service';
import { ApiMessageDto } from './api.dto';

@Controller('/v1')
export class ApiController {
    constructor(
        private readonly service: ApiService
    ) { }

    // @Post('/file')
    // @UseInterceptors(
    //     AnyFilesInterceptor({
    //         storage: diskStorage({
    //             destination: './upload',
    //             filename(req, file, callback) {
    //                 const name = file.originalname;
    //                 callback(null, name);
    //             },
    //         })
    //     }))
    // uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    //     console.log(files);
    //     return 'upload OK!';
    // };

    @Post('/message')
    postMessage(@Body() data: ApiMessageDto) {
        console.log(data);
        return this.service.writeJS(data);
    };
};