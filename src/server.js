import { ApolloServer, AuthenticationError } from 'apollo-server';
import express from 'express';
import passport from 'passport';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import { Schema } from './graphql/schema';
import { logger } from './utils/logger';
import { parseJWTDataFromRequest } from './utils/jwt';

export const buildServer = ({ config, services }) => {
  const app = express();
  passport.use(new GraphQLLocalStrategy((email, password, done) => {
    services.auth.login(email, password)
      .then((user) => {
        if (!user) {
          done(new AuthenticationError('Incorrect email/password.'));
        } else {
          done(null, user);
        }
      })
      .catch((error) => {
        logger.error({ error }, `Authentication failed: ${error.message}`);
        done(new Error('Authentication is down. Please try again later.'));
      });
  }));

  app.use(passport.initialize());

  const server = new ApolloServer({
    cors: true,
    formatError: (error) => {
      logger.error({ error }, `Error with Graphql Resolver: ${error.message}`);
      return error;
    },
    schema: Schema,
    context: ({ req, res }) => {
      const jwtData = parseJWTDataFromRequest(req, config.auth.jwtSecret);

      return buildContext({
        config,
        req,
        res,
        services,
        logger,
        user: jwtData.user,
      });
    },
    playground: {},
    tracing: true,
    cacheControl: true,
  });

  return server;
};
