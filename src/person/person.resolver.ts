import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Resolver('Person')
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Query('persons')
  async getAll(@Context() context): Promise<Person[]> {
    return this.personService.getAll();
  }

  @Query('person')
  async getOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ): Promise<Person> {
    return this.personService.getOne(id);
  }

  @Mutation('createPerson')
  async createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonDto,
    @Context() context,
  ): Promise<Person> {    
    return this.personService.create(createPersonInput);
  }

  @Mutation('updatePerson')
  async updatePerson(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePersonInput') updatePersonInput: UpdatePersonDto,
    @Context() context,
  ): Promise<Person> {    
    return this.personService.update(id,updatePersonInput);
  }

  @Mutation('deletePerson')
  async deletePerson(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ): Promise<Person> {    
    return this.personService.delete(id);
  }
}