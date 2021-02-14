import moment from 'moment';

export const monthBreakdown = async (_p, args, { services }) => {
  const { date, type } = args;
  const startDate = moment.parseZone(date).startOf('month').toISOString();
  const endDate = moment.parseZone(date).endOf('month').toISOString();

  const breakdown = services.transactions.getTransactionAmountBreakdown(
    startDate,
    endDate,
    { type: type ? type.toLowerCase() : undefined },
  );

  return breakdown || [];
};
