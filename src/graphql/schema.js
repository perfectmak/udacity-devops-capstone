import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

const Root = /* GraphQL */ `
  type Query {
    dummy: String
  }
  type Mutation {
    dummy: String
  }
  type Subscription {
    dummy: String
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const queriesToMerge = [];
const mutationsToMerge = [];

// Iterate over each folder in the queries folder
// to then add the index file to the resolver list.
glob.sync(path.join(__dirname, '/queries/*/index.js')).forEach((file) => {
  const query = require(path.resolve(file)).default;
  queriesToMerge.push(query);
});

// Iterate over each folder in the mutations folder
// to then add the index file to the resolver list.
glob.sync(path.join(__dirname, '/mutations/*/index.js')).forEach((file) => {
  const mutation = require(path.resolve(file)).default;
  mutationsToMerge.push(mutation);
});

const resolvers = merge({}, ...queriesToMerge, ...mutationsToMerge);

// Iterate over each type file in the types folder, and load into the typeDefs array
const typeDefs = [Root];
glob.sync(path.join(__dirname, '/*.graphql')).forEach((file) => {
  const type = fs.readFileSync(file, 'utf8');
  typeDefs.push(type);
});

export const Schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default Schema;
