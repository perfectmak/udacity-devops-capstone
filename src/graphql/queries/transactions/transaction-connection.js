import { ValidationError } from 'apollo-server';
import { QueryLimit } from '../../../constants';

const validateArgs = (args) => {
  const { first } = args;

  if (first > QueryLimit) {
    throw new ValidationError(`Validation Error: first argument exceeds query limit of ${QueryLimit}. Try a lower number`);
  }
};

export const transactionConnection = async (_parent, args, ctx) => {
  validateArgs(args);
  return ctx.services.transactions.getTransactionConnection(args);
};
