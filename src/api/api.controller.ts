import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { ThingsboardService } from 'src/thingsboard/thingsboard.service';
import { diskStorage } from 'multer';

@Controller('/api/v1')
export class ApiController {
    constructor(
        private readonly thingsboardService: ThingsboardService
    ) { }

    @Post('/file')
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
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
        return 'upload OK!';
    };

    @Get('/device/attributes')
    async getAttributes() {
        return await this.thingsboardService.getJWTToken();
    };
};