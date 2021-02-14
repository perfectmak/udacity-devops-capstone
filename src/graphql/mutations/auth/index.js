import { generateTokens } from '../../../utils/jwt';

export default {
  Mutation: {
    login: async (_parent, { email, password }, ctx) => {
      const { user } = await ctx.authenticate('graphql-local', { email, password });
      const { accessToken, refreshToken } = await generateTokens({
        user: {
          id: user.id,
          email: user.email,
        },
      }, ctx.config.auth);
      return { user, accessToken, refreshToken };
    },
  },
};
