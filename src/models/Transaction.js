import { Model } from 'objection';
import { initModel } from './BaseModel';
import { QuantityUnit } from '../constants';

const BaseModel = initModel();

export class Transaction extends BaseModel {
  static get tableName() {
    return 'transactions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['amount', 'title', 'type', 'categoryId'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        type: { type: 'string', enum: ['income', 'expense'] },
        amount: { type: 'integer' },
        categoryId: { type: 'integer' },
        quantity: { type: ['number', 'null'] },
        quantityUnit: { type: ['string', 'null'] },
        description: { type: ['string', 'null'] },
        createdAt: { type: 'date-time' },
        updatedAt: { type: 'date-time' },
        deletedAt: { type: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: './Category',
        join: {
          from: 'transactions.categoryId',
          to: 'categories.id',
        },
      },
    };
  }

  $parseJson(json, opt) {
    const updatedJson = super.$parseJson(json, opt);
    if (json.type !== undefined) {
      updatedJson.type = json.type.toLowerCase();
    }

    return updatedJson;
  }

  $beforeInsert() {
    super.$beforeInsert();
    if (this.quantity && !this.quantityUnit) {
      // default quantity to unit if none is specified
      this.quantityUnit = QuantityUnit.Unit;
    }

    if (!this.quantity && this.quantityUnit) {
      // no unit for no quantity.
      this.quantityUnit = null;
    }
  }
}
