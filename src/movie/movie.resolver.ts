import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';

@Resolver('Movie')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query('movies')
  async getAll(@Context() context): Promise<Movie[]> {
    console.log("hi");
    return this.movieService.getAll();
  }

  @Query('movie')
  async getOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ): Promise<Movie> {
    console.log("id",id);
    
    return this.movieService.getOne(id);
  }
}