export class CategoriesService {
  constructor({
    models,
    loaders,
  }) {
    this.models = models;
    this.loaders = loaders;
  }

  async getCategoryById(id) {
    return this.loaders.categories.loadId(id);
  }

  async getCategoriesByType(type) {
    return this.models.Category.query().where({ type });
  }

  async createCategory(params) {
    return this.models.Category.query().insert(params);
  }
}
