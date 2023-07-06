import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { typeDefs } from './type-defs';
import { driver, auth } from 'neo4j-driver';
import { MovieService } from './movie.service';
import { movieRepository } from './movie.repository';
import { RepositoryEnums } from '../common/enums';
import { MovieResolver } from './movie.resolver';

export const movieProviderFactory = async () => {
  const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

  const neo4jDriver = driver(
    NEO4J_URI,
    auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
  );

  const neoSchema = new Neo4jGraphQL({
    typeDefs,
    driver: neo4jDriver,
  });

  const schema = await neoSchema.getSchema();
  await neoSchema.assertIndexesAndConstraints({
    options: { create: true },
  });

  return {
    playground: true,
    schema,
  };
};

@Module({
  imports: [
    GraphQLModule.forRoot<any>({
      driver: ApolloDriver,
      typePaths: ['./../**/schema/*.gql'],
      definitions: {
        path: './src/graphql/gql-types.ts',
      },
      context: (args) => args,
      formatError: (error) => {
        const graphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
        };

        console.error(error);
        return graphQLFormattedError;
      },
    }),
  ],
  providers: [
    MovieService,
    MovieResolver,
    {
      provide: RepositoryEnums.MOVIE,
      useClass: movieRepository,
    },
  ],
  exports: [MovieService],
})
export class MovieModule {}
