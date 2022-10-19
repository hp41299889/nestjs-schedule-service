import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

import { ApiService } from './api.service';
import { ApiMessageDto, WhisperDto } from './api.dto';
import { CreateCatDto } from 'src/database/mongo/cat/cat.dto';
import { CreateDogDto } from 'src/database/postgre/dog/dog.dto';

@Controller('/v1')
export class ApiController {
    constructor(
        private readonly service: ApiService,
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

    @Post('/cat')
    async catCreate(@Body() createCatDto: CreateCatDto) {
        return this.service.catCreate(createCatDto);
    };

    @Get('/cat')
    async catFindAll() {
        return this.service.catFindAll();
    };

    @Post('/dog')
    async dogCreate(@Body() createDogDto: CreateDogDto) {
        return this.service.dogCreate(createDogDto);
    };

    @Get('/dog')
    async dogFindAll() {
        return this.service.dogFindAll();
    };
};