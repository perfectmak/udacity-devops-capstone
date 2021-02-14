export class UsersService {
  constructor({
    models,
    loaders,
  }) {
    this.models = models;
    this.loaders = loaders;
  }

  async getUserById(id) {
    return this.loaders.users.loadId(id);
  }
}
