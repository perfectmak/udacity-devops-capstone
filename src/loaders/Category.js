import { createDataLoader } from '../utils/dataloader';

export class CategoryLoader {
  constructor({ models }) {
    this.idLoader = createDataLoader((ids) => models.Category.query().whereIn('id', ids));
  }

  loadId(id) {
    return this.idLoader.load(id);
  }
}
