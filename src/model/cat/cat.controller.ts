import { Controller, Get, Post, Delete, Body, Patch, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CreateCatDto, UpdateCatDto } from './cat.dto';
import { CatService } from './cat.service';
import { Cat } from './cat.interface';

@Controller('cat')
export class CatController {
    constructor(private readonly catService: CatService) { }

    @Post()
    @ApiOperation({ tags: ['cat'] })
    async create(@Body() createCatDto: CreateCatDto) {
        return this.catService.create(createCatDto);
    };

    @Get()
    @ApiOperation({ tags: ['cat'] })
    async findAll() {
        return this.catService.findAll();
    };

    @Get(':id')
    @ApiOperation({ tags: ['cat'] })
    async findOne(@Param('id') id: string) {
        return this.catService.findOne(id);
    };

    @Patch(':id')
    @ApiOperation({ tags: ['cat'] })
    async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
        return this.catService.update(id, updateCatDto);
    };

    @Delete(':id')
    @ApiOperation({ tags: ['cat'] })
    async delete(@Param('id') id: string): Promise<Cat> {
        return this.catService.delete(id);
    };
};