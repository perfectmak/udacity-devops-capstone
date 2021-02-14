import { UserLoader } from './User';
import { CategoryLoader } from './Category';

export const buildLoaders = ({ models }) => ({
  users: new UserLoader({ models }),
  categories: new CategoryLoader({ models }),
});
