import { Inject, Injectable } from '@nestjs/common';
import { crudInterface } from '../common/crud.interface';
import { Movie } from './entities/movie.entity';
import { RepositoryEnums } from '../common/enums';

@Injectable()
export class MovieService implements crudInterface<Movie> {
  constructor(
    @Inject(RepositoryEnums.MOVIE)
    private readonly movieRepository: crudInterface<Movie>,
  ) {}

  getAll(): Movie[] {
    return this.movieRepository.getAll();
  }

  getOne(id: number): Movie {
    return this.movieRepository.getOne(id);
  }

  create(movie: Movie): Movie {
    return this.movieRepository.create(movie);
  }

  update(id: number, movie: Movie): Movie {
    return this.movieRepository.update(id, movie);
  }

  delete(id: number): Movie {
    return this.movieRepository.delete(id);
  }
}
