import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Resolver('Movie')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query('movies')
  async getAll(@Context() context): Promise<Movie[]> {
    return this.movieService.getAll();
  }

  @Query('movie')
  async getOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ): Promise<Movie> {
    return this.movieService.getOne(id);
  }

  @Mutation('createMovie')
  async createMovie(
    @Args('createMovieInput') createMovieInput: CreateMovieDto,
    @Context() context,
  ): Promise<Movie> {    
    return this.movieService.create(createMovieInput);
  }

  @Mutation('updateMovie')
  async updateMovie(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieDto,
    @Context() context,
  ): Promise<Movie> {    
    return this.movieService.update(id,updateMovieInput);
  }

  @Mutation('deleteMovie')
  async deleteMovie(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ): Promise<Movie> {    
    return this.movieService.delete(id);
  }
}