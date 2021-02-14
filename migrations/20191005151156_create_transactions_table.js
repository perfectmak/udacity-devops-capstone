
exports.up = async ({ schema }) => {
  await schema.createTable('transactions', (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.dateTime('deletedAt').nullable();
    t.integer('amount').notNull();
    t.string('title').notNull();
    t.string('type').notNull();
    t.integer('createdBy').unsigned().notNull();
    t.integer('categoryId').unsigned().notNull();
    t.integer('quantity').unsigned().nullable();
    t.string('quantityUnit').nullable();
    t.text('description').nullable();

    t.foreign('categoryId').references('categories.id');
    t.foreign('createdBy').references('users.id');
  });
};

exports.down = async ({ schema }) => {
  await schema.dropTable('transactions');
};
