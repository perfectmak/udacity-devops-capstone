exports.up = async ({ schema }) => {
  await schema.alterTable('transactions', (t) => {
    t.index('type');
  });
};

exports.down = async ({ schema }) => {
  await schema.alterTable('transactions', (t) => {
    t.dropIndex('type');
  });
};
