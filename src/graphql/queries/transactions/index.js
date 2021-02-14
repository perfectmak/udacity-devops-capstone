import { authenticatedMiddleware as authenticated } from '../../../utils/middlewares/authenticatedMiddleware';
import { transactionConnection } from './transaction-connection';
import { monthSummary } from './month-summary';
import { monthBreakdown } from './month-breakdown';
import { yearSummary } from './year-summary';

export default {
  Query: {
    transactionConnection: authenticated(transactionConnection),
    monthSummary: authenticated(monthSummary),
    monthBreakdown: authenticated(monthBreakdown),
    yearSummary: authenticated(yearSummary),
  },
  Transaction: {
    type: (parent) => parent.type.toUpperCase(),
    category: async (parent, _args, ctx) => ctx.services.categories
      .getCategoryById(parent.categoryId),
    createdBy: async (parent, _args, ctx) => {
      if (!parent.createdBy) {
        return null;
      }
      return ctx.services.users.getUserById(parent.createdBy);
    },
  },
};
