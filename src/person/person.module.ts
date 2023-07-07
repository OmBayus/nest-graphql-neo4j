import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { personRepository } from './person.repository';
import { RepositoryEnums } from '../common/enums';
import { PersonResolver } from './person.resolver';

@Module({
  imports: [],
  providers: [
    PersonService,
    PersonResolver,
    {
      provide: RepositoryEnums.MOVIE,
      useClass: personRepository,
    },
  ],
  exports: [PersonService],
})
export class PersonModule {}
