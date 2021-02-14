
exports.up = async ({ schema }) => {
  await schema.alterTable('transactions', (t) => {
    t.dateTime('date').notNull().defaultTo(new Date().toISOString());
  });
};

exports.down = async ({ schema }) => {
  await schema.alterTable('transactions', (t) => {
    t.dropColumn('date');
  });
};
