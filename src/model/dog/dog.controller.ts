import { Controller, Get, Post, Delete, Body, Patch, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CreateDogDto, UpdateDogDto } from './dog.dto';
import { DogService } from './dog.service';
import { Dog } from './dog.entity';

@Controller('dog')
export class DogController {
    constructor(private readonly dogService: DogService) { }

    @Post()
    @ApiOperation({ tags: ['dog'] })
    async create(@Body() createDogDto: CreateDogDto): Promise<Dog> {
        return this.dogService.create(createDogDto);
    };

    @Get()
    @ApiOperation({ tags: ['dog'] })
    async findAll(): Promise<Dog[]> {
        return this.dogService.findAll();
    };

    @Get(':id')
    @ApiOperation({ tags: ['dog'] })
    async findOne(@Param('id') id: number): Promise<Dog> {
        return this.dogService.findOne(id);
    };

    @Patch(':id')
    @ApiOperation({ tags: ['dog'] })
    async update(@Param('id') id: number, @Body() updateDogDto: UpdateDogDto): Promise<void> {
        await this.dogService.update(id, updateDogDto);
    };

    @Delete(':id')
    @ApiOperation({ tags: ['dog'] })
    async delete(@Param('id') id: number): Promise<void> {
        await this.dogService.delete(id);
    };
};