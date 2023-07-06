import { Movie } from "src/movie/entities/movie.entity";

export class Person {
  id: number;
  name: string;
  born: number;
  actedInMovies: Movie[];
  directedMovies: Movie[];
}
