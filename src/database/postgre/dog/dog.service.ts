import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from './dog.entity';
import { CreateDogDto } from './dog.dto';

@Injectable()
export class DogService {
    constructor(
        @InjectRepository(Dog) private dogRepository: Repository<Dog>
    ) { }

    async create(createDogDto: CreateDogDto) {
        const dog = new Dog();
        dog.name = createDogDto.name;
        dog.age = createDogDto.age;
        dog.sex = createDogDto.sex;

        return this.dogRepository.save(dog);
    };

    findAll(): Promise<Dog[]> {
        return this.dogRepository.find();
    };
};