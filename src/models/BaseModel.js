import { Model } from 'objection';
import Knex from 'knex';
import Knexfile from '../../knexfile';

export class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }
}

export const initModel = () => {
  const env = process.env.NODE_ENV || 'development';
  const knex = Knex(Knexfile[env]);
  BaseModel.knex(knex);
  return BaseModel;
};
