import { ValidationError } from 'apollo-server';

export const editTransaction = async (_parent, args, { services, user, logger }) => {
  const { id, input } = args;

  const transaction = await services.transactions.editTransactionById(id, input);

  if (!transaction) {
    throw new ValidationError(`Unknown transaction ${id} to be edited.`);
  }

  logger.info({
    event: {
      type: 'update',
      objectType: 'transaction',
      objectId: id,
      actorType: 'user',
      actorId: user.id,
      input,
    },
  }, `User [${user.id}(${user.email})] updated transaction [${id}].`);

  return transaction;
};
