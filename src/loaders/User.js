import { createDataLoader } from '../utils/dataloader';

export class UserLoader {
  constructor({ models }) {
    this.idLoader = createDataLoader((ids) => models.User.query().whereIn('id', ids));
  }

  loadId(id) {
    return this.idLoader.load(id);
  }
}
