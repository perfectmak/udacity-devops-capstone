const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL || 'postgres://postgres:superscret@localhost:5432/transaction_mgmt_dev',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
