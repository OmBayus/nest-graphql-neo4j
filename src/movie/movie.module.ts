import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { movieRepository } from './movie.repository';
import { RepositoryEnums } from '../common/enums';
import { MovieResolver } from './movie.resolver';

@Module({
  imports: [],
  providers: [
    MovieService,
    MovieResolver,
    {
      provide: RepositoryEnums.MOVIE,
      useClass: movieRepository,
    },
  ],
  exports: [MovieService],
})
export class MovieModule {}
