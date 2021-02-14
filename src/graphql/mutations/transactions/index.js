import { authenticatedMiddleware as authenticated } from '../../../utils/middlewares/authenticatedMiddleware';
import { createTransaction } from './create-transaction';
import { editTransaction } from './edit-transaction';
import { deleteTransaction } from './delete-transaction';

export default {
  Mutation: {
    createTransaction: authenticated(createTransaction),
    deleteTransaction: authenticated(deleteTransaction),
    editTransaction: authenticated(editTransaction),
  },
};
