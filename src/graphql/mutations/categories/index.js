import { createCategory } from './create-category';
import { authenticatedMiddleware } from '../../../utils/middlewares/authenticatedMiddleware';

export default {
  Mutation: {
    createCategory: authenticatedMiddleware(createCategory),
  },
};
