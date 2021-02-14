const { hash, generateSalt } = require('../src/utils/crypto');

// NOTE: Update the default email of the admin user

exports.seed = async (knex) => {
  const usersHash = generateSalt();
  // Deletes ALL existing entries
  await knex('users').insert({
    firstName: 'Admin',
    email: 'root@email.com',
    password: await hash('default-root-password', usersHash),
    salt: usersHash,
    createdAt: new Date().toISOString(),
  });
};
