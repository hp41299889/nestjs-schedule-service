import { Get, Controller, Render } from '@nestjs/common';

@Controller('view')
export class AppController {
    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }
}