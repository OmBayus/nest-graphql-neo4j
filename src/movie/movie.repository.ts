import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { crudInterface } from 'src/common/crud.interface';
import { Movie } from './entities/movie.entity';
import { Neo4jService } from 'nest-neo4j';
import { error } from 'console';

@Injectable()
export class movieRepository implements crudInterface<Movie> {
  constructor(private readonly neo4jService: Neo4jService) { }
  async getAll(): Promise<Movie[]> {
    const res = await this.neo4jService.read(`MATCH (n:Movie) RETURN n`);
    const result = [];

    for (const record of res.records) {
      const movieId = record.get('n').identity.toInt();
      const movieProps = record.get('n').properties;

      const directorsQuery = await this.neo4jService.read(
        `match (n:Movie)<-[:DIRECTED]-(m:Person) where id(n)=${movieId} return m`,
      );
      const actorsQuery = await this.neo4jService.read(
        `match (n:Movie)<-[:ACTED_IN]-(m:Person) where id(n)=${movieId} return m`,
      );

      result.push({
        id: movieId,
        ...movieProps,
        released: movieProps.released.toInt(),
        directors: directorsQuery.records.map((record) => {
          let director = {
            id: record.get('m').identity.toInt(),
            ...record.get('m').properties,
          };
          if (director.born) director.born = director.born.toInt();
          return director;
        }),
        actors: actorsQuery.records.map((record) => {
          let actor = {
            id: record.get('m').identity.toInt(),
            ...record.get('m').properties,
          };
          if (actor.born) actor.born = actor.born.toInt();
          return actor;
        }),
      });
    }

    return result;
  }
  async getOne(id: number): Promise<Movie> {
    const res = await this.neo4jService.read(`MATCH (n:Movie) where id(n)=${id} RETURN n`);
    const result = [];
    if (!res.records.length)
      throw new HttpException('HATA', HttpStatus.BAD_REQUEST)
    console.log(res.records.at(0).get('n').properties.title);
    const movieProps = res.records.at(0).get('n');

    let movie = {
      id: id,
      title: movieProps.properties.title,
      released: movieProps.properties.released.toInt(),
      tagline: movieProps.properties.tagline,
      directors: [],
      actors: []
    }

    const directorsQuery = await this.neo4jService.read(
      `match (n:Movie)<-[:DIRECTED]-(m:Person) where id(n)=${id} return m`,
    );
    const actorsQuery = await this.neo4jService.read(
      `match (n:Movie)<-[:ACTED_IN]-(m:Person) where id(n)=${id} return m`,
    );

    movie.directors = directorsQuery.records.map((record) => {
      let director = {
        id: record.get('m').identity.toInt(),
        ...record.get('m').properties,
      };
      if (director.born) director.born = director.born.toInt();
      return director;
    })
    movie.actors = actorsQuery.records.map((record) => {
      let actor = {
        id: record.get('m').identity.toInt(),
        ...record.get('m').properties,
      };
      if (actor.born) actor.born = actor.born.toInt();
      return actor;
    })
    return movie;
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
