import { initModel } from './BaseModel';

const BaseModel = initModel();

export class Category extends BaseModel {
  static get tableName() {
    return 'categories';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'type'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        type: { type: 'string', enum: ['income', 'expense'] },
        createdBy: { type: 'integer' },
      },
    };
  }
}
