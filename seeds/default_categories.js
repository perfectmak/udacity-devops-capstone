
const defaultIncomeCategories = [
  'Sales',
  'Capital',
  'Bonus',
  'Interest',
  'Other',
];

const defaultExpenseCategories = [
  'Materials',
  'Fuel',
  'Stationery',
  'PHCN',
  'Transportation',
  'Delivery',
  'Debt',
  'Repairs',
  'Salaries',
  'Food',
  'Miscellaneous',
  'Other',
];

exports.seed = async (knex) => {
  const createdAt = new Date().toISOString();

  await knex('categories').insert(defaultIncomeCategories.map((title) => ({
    title,
    type: 'income',
    createdAt,
  })));

  await knex('categories').insert(defaultExpenseCategories.map((title) => ({
    title,
    type: 'expense',
    createdAt,
  })));
};
