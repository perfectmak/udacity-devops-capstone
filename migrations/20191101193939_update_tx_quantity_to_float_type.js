exports.up = async ({ schema }) => {
  await schema.alterTable('transactions', (t) => {
    t.float('quantity').nullable().alter();
  });
};

exports.down = async ({ schema }) => {
  await schema.alterTable('transactions', (t) => {
    t.integer('quantity').unsigned().nullable().alter();
  });
};
