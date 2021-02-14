import { ValidationError } from 'apollo-server';

export const deleteTransaction = async (_parent, args, { services, logger, user }) => {
  const { id } = args;

  const transaction = await services.transactions.deleteTransactionById(id);
  if (!transaction) {
    throw new ValidationError(`Unknown transaction ${id} to be deleted.`);
  }

  logger.info({
    event: {
      type: 'delete',
      objectType: 'transaction',
      objectId: id,
      actorType: 'user',
      actorId: user.id,
    },
  }, `User [${user.id}(${user.email})] deleting transaction [${id}].`);

  return transaction;
};
