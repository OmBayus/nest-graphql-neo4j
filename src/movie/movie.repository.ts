import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { crudInterface } from 'src/common/crud.interface';
import { Movie } from './entities/movie.entity';
import { Neo4jService } from 'nest-neo4j';
import { error } from 'console';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class movieRepository implements crudInterface<Movie> {
  constructor(private readonly neo4jService: Neo4jService) {}
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
    const res = await this.neo4jService.read(
      `MATCH (n:Movie) where id(n)=${id} RETURN n`,
    );
    const result = [];
    if (!res.records.length)
      throw new HttpException('HATA', HttpStatus.BAD_REQUEST);
    console.log(res.records.at(0).get('n').properties.title);
    const movieProps = res.records.at(0).get('n');

    let movie = {
      id: id,
      title: movieProps.properties.title,
      released: movieProps.properties.released.toInt(),
      tagline: movieProps.properties.tagline,
      directors: [],
      actors: [],
    };

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
    });
    movie.actors = actorsQuery.records.map((record) => {
      let actor = {
        id: record.get('m').identity.toInt(),
        ...record.get('m').properties,
      };
      if (actor.born) actor.born = actor.born.toInt();
      return actor;
    });
    return movie;
  }
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    console.log(createMovieDto);

    const res = await this.neo4jService.write(
      `CREATE (n:Movie {title: '${createMovieDto.title}', released: ${createMovieDto.released}, tagline: '${createMovieDto.tagline}'}) RETURN n`,
    );

    return {id:res.records[0].get('n').identity.toInt(),...res.records[0].get('n').properties}
  }
  async update(id: number,  updateMovieDto:UpdateMovieDto): Promise<Movie> {
    const res = await this.neo4jService.write(
      `MATCH (n:Movie) where id(n)=${id} SET n.title='${updateMovieDto.title}', n.released=${updateMovieDto.released}, n.tagline='${updateMovieDto.tagline}' RETURN n`,
    );
    if(!res.records.length)
      throw new HttpException('HATA', HttpStatus.BAD_REQUEST);
    return {id:res.records[0].get('n').identity.toInt(),...res.records[0].get('n').properties};
  }
  delete(id: number): Movie {
    return new Movie();
  }
}
