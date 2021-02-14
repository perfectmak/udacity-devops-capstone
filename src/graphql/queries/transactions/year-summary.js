import moment from 'moment';
import { range, reverse } from 'lodash';
import { TransactionType } from '../../../constants';

const MONTHS_IN_YEAR = 12;

export const yearSummary = async (_p, args, { services }) => {
  const { date } = args;
  const inputDate = moment.parseZone(date);

  const resultPromises = reverse(range(MONTHS_IN_YEAR))
    .map((i) => inputDate.clone().subtract(i, 'month').startOf('month'))
    .map(async (initialDate) => {
      const startDate = initialDate.toISOString();
      const endDate = initialDate.endOf('month').toISOString();
      const fetchTotalIncome = services.transactions.getTotalTransactionAmount(
        startDate,
        endDate,
        { type: TransactionType.Income },
      );

      const fetchTotalExpense = services.transactions.getTotalTransactionAmount(
        startDate,
        endDate,
        { type: TransactionType.Expense },
      );

      const [totalIncome, totalExpense] = await Promise.all([fetchTotalIncome, fetchTotalExpense]);
      const totalProfit = totalIncome - totalExpense;

      return {
        date: startDate,
        totalIncome,
        totalProfit,
        totalExpense,
      };
    });

  return Promise.all(resultPromises);
};
