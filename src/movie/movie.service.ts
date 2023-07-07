import { Inject, Injectable } from '@nestjs/common';
import { crudInterface } from '../common/crud.interface';
import { Movie } from './entities/movie.entity';
import { RepositoryEnums } from '../common/enums';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService implements crudInterface<Movie> {
  constructor(
    @Inject(RepositoryEnums.MOVIE)
    private readonly movieRepository: crudInterface<Movie>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.movieRepository.getAll();
  }

  async getOne(id: number): Promise<Movie> {
    return this.movieRepository.getOne(id);
  }

  async create(movie: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.create(movie);
  }

  async update(id: number, movie: Movie): Promise<Movie> {
    return this.movieRepository.update(id, movie);
  }

  async delete(id: number): Promise<Movie> {
    return this.movieRepository.delete(id);
  }
}
