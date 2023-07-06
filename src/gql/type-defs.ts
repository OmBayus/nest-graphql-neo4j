import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Movie {
    title: String!
    released: Int!
  }
`;
