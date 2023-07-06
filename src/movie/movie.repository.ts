import { Injectable } from "@nestjs/common";
import { crudInterface } from "src/common/crud.interface";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class movieRepository implements crudInterface<Movie> {
  constructor(
    // private readonly neo4jService: Neo4jService,
    ) {}
    getAll(): Movie[] {
        return [];
    }
    getOne(id: number): Movie {
        return new Movie();
    }
    create(t: Movie): Movie {
        return new Movie();
    }
    update(id: number, t: Movie): Movie {
        return new Movie();
    }
    delete(id: number): Movie {
        return new Movie();
    }

  }