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
      const personId = record.get('n').identity.toInt();
      const personProps = record.get('n').properties;

      const actedInQuery = await this.neo4jService.read(
        `match (n:Person)-[:ACTED_IN]->(m:Movie) where id(n)=${personId} return m`,
      );
      const directedQuery = await this.neo4jService.read(
        `match (n:Person)-[:DIRECTED]->(m:Movie) where id(n)=${personId} return m`,
      );
      let person = {
        id: personId,
        ...personProps,
        actedInMovies: actedInQuery.records.map((record) => {
          let actedMovie = {
            id: record.get('m').identity.toInt(),
            ...record.get('m').properties,
          };
          if (actedMovie.released) actedMovie.released = actedMovie.released.toInt();
          return actedMovie;
        }),
        directedMovies: directedQuery.records.map((record) => {
          let directedMovie = {
            id: record.get('m').identity.toInt(),
            ...record.get('m').properties,
          };
          if (directedMovie.released) directedMovie.released = directedMovie.released.toInt();
          return directedMovie;
        }),
      }
      result.push(person)
    }
    result.map((person) => {
      if (person.born) person.born = person.born.toInt()
      return person;
    })
    return result;
  }
  async getOne(id: number): Promise<Person> {
    const res = await this.neo4jService.read(
      `MATCH (n:Person) where id(n)=${id} RETURN n`,
    );
    const result = [];
    if (!res.records.length)
      throw new HttpException('HATA', HttpStatus.BAD_REQUEST);
    const personProps = res.records.at(0).get('n').properties;

    let person = {
      id: id,
      name: personProps.name,
      born: personProps.born.toInt(),
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
      let directedMovie = {
        id: record.get('m').identity.toInt(),
        ...record.get('m').properties,
      };
      return directedMovie;
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
