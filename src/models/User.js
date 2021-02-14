import { initModel } from './BaseModel';

const BaseModel = initModel();

export class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'salt'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        salt: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        createdAt: { type: 'date-time' },
        updatedAt: { type: 'date-time' },
      },
    };
  }
}
