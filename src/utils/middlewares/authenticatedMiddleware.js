import { AuthenticationError } from 'apollo-server';

export const authenticatedMiddleware = (resolver) => (parent, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError('Authentication required. Please login.');
  }

  return resolver(parent, args, ctx);
};
