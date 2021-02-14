
exports.up = async ({ schema }) => {
  await schema.createTable('categories', (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.string('title').notNull();
    t.string('type').notNull(); // either income or expense
    t.integer('createdBy').nullable();

    t.unique(['title', 'type']);
  });
};

exports.down = async ({ schema }) => {
  await schema.dropTable('categories');
};
