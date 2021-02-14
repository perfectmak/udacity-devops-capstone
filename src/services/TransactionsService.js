import { knexPaginator as paginate } from 'apollo-cursor-pagination';
import { knexFlexFilter, EQ } from 'knex-flex-filter';
import { mapKeys } from 'lodash';
import { raw } from 'objection';

const typeQueryOverride = (baseQuery, column, condition, value) => {
  const normalizedValue = value.toLowerCase();
  switch (condition) {
    case EQ:
      return baseQuery.where(column, normalizedValue);
    default:
      return false;
  }
};

export class TransactionsService {
  constructor({
    models,
  }) {
    this.models = models;
  }

  async createTransaction(params) {
    return this.models.Transaction.query().insert(params);
  }

  async editTransactionById(id, params) {
    const updated = await this.models.Transaction.query()
      .where({ id })
      .patch({ ...params, deletedAt: undefined })
      .first()
      .returning('*');

    return updated;
  }

  async deleteTransactionById(id) {
    const [deleted] = await this.models.Transaction.query()
      .where({ id })
      .patch({ deletedAt: new Date().toISOString() })
      .returning('*');

    return deleted;
  }

  async getTransactionConnection(params) {
    const {
      first,
      after,
      last,
      before,
      where,
      orderBy,
      orderDirection,
    } = params;

    const baseQuery = knexFlexFilter(
      this.models.Transaction.query().whereNull('deletedAt'),
      where,
      {
        caseInsensitiveSearch: true,
        columnQueryOverrides: {
          type: typeQueryOverride,
        },
      },
    );

    let processedOrderBy = orderBy;
    if (orderBy === 'createdAt') {
      processedOrderBy = 'id';
    }

    const result = await paginate(baseQuery, {
      first,
      after,
      last,
      before,
      orderBy: processedOrderBy,
      orderDirection,
    });

    return {
      edges: [],
      ...result,
    };
  }

  async getTotalTransactionAmount(startDate, endDate, filter) {
    const result = await this.models.Transaction.query().where(filter)
      .andWhere('date', '>=', startDate)
      .andWhere('date', '<=', endDate)
      .sum('amount')
      .first();

    return parseInt(result.sum, 10) || 0;
  }

  async getTransactionAmountBreakdown(startDate, endDate, filter) {
    const formattedFilter = mapKeys(filter, (_value, key) => (`transactions.${key}`));

    const result = await this.models.Transaction.query()
      .select(
        'category.title',
        // cast to ensure these values return as numbers
        raw('cast(sum(amount) as int) as amount'),
        raw('cast(count(*) as int) as count'),
      )
      .joinRelation('category')
      .where(formattedFilter)
      .andWhere('date', '>=', startDate)
      .andWhere('date', '<=', endDate)
      .groupBy('category.title');

    return result;
  }
}
