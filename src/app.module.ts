import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { GraphqlModule } from './graphql/graphql.module';
import { Neo4jModule } from 'nest-neo4j';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MovieModule,
    PersonModule,
    GraphqlModule,
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: 'password',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
