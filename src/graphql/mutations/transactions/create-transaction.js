export const createTransaction = async (_parent, args, { services, user }) => {
  const { input } = args;

  const createdBy = user.id;

  const transaction = await services.transactions.createTransaction({
    ...input,
    createdBy,
  });

  return transaction;
};
