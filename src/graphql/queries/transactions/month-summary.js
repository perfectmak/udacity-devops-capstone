import moment from 'moment';
import { TransactionType } from '../../../constants';

export const monthSummary = async (_p, args, { services }) => {
  const { date } = args;
  const startDate = moment.parseZone(date).startOf('month').toISOString();
  const endDate = moment.parseZone(date).endOf('month').toISOString();

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
    totalExpense,
    totalProfit,
  };
};
