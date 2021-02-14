import pluralize from 'pluralize';
import { nullNoop } from './string-utils';
import { formatDateToISO } from './date-utils';

export const EXPENSE_TX_TYPE = 'EXPENSE';
export const INCOME_TX_TYPE = 'INCOME';
const TransactionTypes = ['INCOME', 'EXPENSE'];

export const toTransactionType = nullNoop((value) => {
  const index = TransactionTypes.indexOf(value.toUpperCase());
  if (index === -1) {
    return null;
  }

  return TransactionTypes[index];
})

export const parseTransactionFormInput = (value) => {
  const {
    title,
    amount,
    type,
    categoryId,
    date,
    quantity,
    quantityUnit,
    description,
  } = value;
  const result = {
    title,
    amount: parseInt(parseFloat(amount) * 100), // this is store a kobo
    type: toTransactionType(type),
    categoryId: parseInt(categoryId),
    date: formatDateToISO(date), // to format this
    quantity: (quantity) ? parseFloat(quantity) : null,
    quantityUnit: quantityUnit || null,
    description: description || null,
  }

  return result;
};

export const formatQuantityUnit = (unit, quantity) => {
  if (quantity === undefined || quantity === null) {
    return pluralize(unit);
  }
  return pluralize(unit, parseFloat(quantity), true);
}

export const transactionTitleSummarized = (transaction) => {
  let formattedTitle = transaction.title;
  if (transaction.quantity) {
    formattedTitle += ` (${formatQuantityUnit(transaction.quantityUnit, transaction.quantity)})`;
  }

  return formattedTitle;
}
