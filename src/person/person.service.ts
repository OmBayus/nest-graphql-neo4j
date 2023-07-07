import { Inject, Injectable } from '@nestjs/common';
import { crudInterface } from '../common/crud.interface';
import { Person } from './entities/person.entity';
import { RepositoryEnums } from '../common/enums';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService implements crudInterface<Person> {
  constructor(
    @Inject(RepositoryEnums.MOVIE)
    private readonly personRepository: crudInterface<Person>,
  ) {}

  async getAll(): Promise<Person[]> {
    return this.personRepository.getAll();
  }

  async getOne(id: number): Promise<Person> {
    return this.personRepository.getOne(id);
  }

  async create(movie: CreatePersonDto): Promise<Person> {
    return this.personRepository.create(movie);
  }

  async update(id: number, movie: UpdatePersonDto): Promise<Person> {
    return this.personRepository.update(id, movie);
  }

  async delete(id: number): Promise<Person> {
    return this.personRepository.delete(id);
  }
}
