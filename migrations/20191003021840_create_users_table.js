
exports.up = async ({ schema }) => {
  await schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.string('email').notNull();
    t.string('password').nullable();
    t.string('firstName').nullable();
    t.string('lastName').nullable();
    t.string('salt').nullable();

    t.unique('email');
  });
};

exports.down = async ({ schema }) => {
  await schema.dropTable('users');
};
