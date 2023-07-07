import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { crudInterface } from 'src/common/crud.interface';
import { Person } from './entities/person.entity';
import { Neo4jService } from 'nest-neo4j';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class personRepository implements crudInterface<Person> {
  constructor(private readonly neo4jService: Neo4jService) { }
  async getAll(): Promise<Person[]> {
    const res = await this.neo4jService.read(`MATCH (n:Person) RETURN n`);
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
  async getOne(id: number): Promise<Person> {
    const res = await this.neo4jService.read(
      `MATCH (n:Person) where id(n)=${id} RETURN n`,
    );
    const result = [];
    if (!res.records.length)
      throw new HttpException('HATA', HttpStatus.BAD_REQUEST);
    const personProps = res.records.at(0).get('n');

    let person = {
      id: id,
      name: personProps.properties.name,
      born: personProps.properties.born.toInt(),
      actedInMovies: [],
      directedMovies: [],
    };

    const actedInQuery = await this.neo4jService.read(
      `match (n:Person)-[:ACTED_IN]->(m:Movie) where id(n)=${id} return m`,
    );
    const directedQuery = await this.neo4jService.read(
      `match (n:Person)-[:DIRECTED]->(m:Movie) where id(n)=${id} return m`,
    );

    person.actedInMovies = actedInQuery.records.map((record) => {
      let actedMovie = {
        id: record.get('m').identity.toInt(),
        ...record.get('m').properties,
      };
      return actedMovie;
    });
    person.directedMovies = directedQuery.records.map((record) => {
      let actor = {
        id: record.get('m').identity.toInt(),
        ...record.get('m').properties,
      };
      return actor;
    });
    return person;
  }
  async create(createPersonDto: CreatePersonDto): Promise<Person> {

    const res = await this.neo4jService.write(
      `CREATE (n:Person {name: '${createPersonDto.name}', born: ${createPersonDto.born}, tagline: '${createPersonDto}'}) RETURN n`,
    );

    return { id: res.records[0].get('n').identity.toInt(), ...res.records[0].get('n').properties }
  }
  async update(id: number, updateMovieDto: UpdatePersonDto): Promise<Person> {
    const res = await this.neo4jService.write(
      `MATCH (n:Person) where id(n)=${id} SET n.name='${updateMovieDto.name}', n.born=${updateMovieDto.born}, n.tagline='${updateMovieDto}' RETURN n`,
    );
    if (!res.records.length)
      throw new HttpException('HATA', HttpStatus.BAD_REQUEST);
    return { id: res.records[0].get('n').identity.toInt(), ...res.records[0].get('n').properties };
  }
  async delete(id: number): Promise<Person> {

    const movie = await this.getOne(id);
    if (!movie)
      throw new HttpException('HATA', HttpStatus.BAD_REQUEST);

    await this.neo4jService.write(
      `MATCH (n:Person) where id(n)=${id} DETACH DELETE n`,
    );
    return movie;
  }
}
