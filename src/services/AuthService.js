import { verifyHash } from '../utils/crypto';

export class AuthService {
  constructor({
    models,
  }) {
    this.models = models
  }

  async login(email, password) {
    const user = await this.models.User.query().where({ email }).first();
    if (!user) {
      return null;
    }

    const isValid = await verifyHash(user.password, password, user.salt);
    if (!isValid) {
      return null;
    }

    return user;
  }
}
