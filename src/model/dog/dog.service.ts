import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDogDto, UpdateDogDto } from './dog.dto';
import { Dog } from './dog.entity';

@Injectable()
export class DogService {
    constructor(
        @InjectRepository(Dog) private readonly dogRepository: Repository<Dog>
    ) { }

    async create(createDogDto: CreateDogDto): Promise<Dog> {
        const dog = new Dog();
        const { name, age, sex } = createDogDto;
        dog.name = name;
        dog.age = age;
        dog.sex = sex;
        return await this.dogRepository.save(dog);
    };

    async findAll(): Promise<Dog[]> {
        return await this.dogRepository.find();
    };

    async findOne(id: number): Promise<Dog> {
        return await this.dogRepository.findOneBy({ id: id });
    };

    async update(id: number, updateDogDto: UpdateDogDto): Promise<void> {
        const { name, age, sex } = updateDogDto;
        const dog = new Dog();
        dog.name = name;
        dog.age = age;
        dog.sex = sex;
        await this.dogRepository.update(id, dog);
    };

    async delete(id: number): Promise<void> {
        await this.dogRepository.delete(id);
    };
};