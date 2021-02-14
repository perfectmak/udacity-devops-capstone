import { AuthService } from './AuthService';
import { CategoriesService } from './CategoriesService';
import { UsersService } from './UsersService';
import { TransactionsService } from './TransactionsService';

export const buildServices = ({ models, loaders }) => {
  const options = {
    models,
    loaders,
  };

  return {
    auth: new AuthService(options),
    categories: new CategoriesService(options),
    users: new UsersService(options),
    transactions: new TransactionsService(options),
  };
};
