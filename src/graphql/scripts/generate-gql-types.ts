import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./../../**/schema/*.gql'],
  path: join(process.cwd(), 'src/graphql/gql-types.ts'),
  outputAs: 'class',
});
