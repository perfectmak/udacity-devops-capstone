const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 9797,
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'superobfuscatedjwtsecret',
    refreshTokenTtl: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '2 days',
    accessTokenTtl: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '1 day',
  },
};
