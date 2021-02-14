exports.up = async ({ schema }) => {
  await schema.alterTable('transactions', (t) => {
    t.index('date');
  });
};

exports.down = async ({ schema }) => {
  await schema.alterTable('transactions', (t) => {
    t.dropIndex('date');
  });
};
