import formatNum from 'format-num';

export const toBaseUnit = (amount) => amount * 100;

export const fromBaseUnit = (amount) => amount / 100;

export const formatCurrency = (amount, { isBaseUnit = true, includeCurrency = false, currency = '₦' } = {}) => {
  const formatedAmount = (isBaseUnit) ? formatNum(fromBaseUnit(amount)) : formatNum(amount);
  if (includeCurrency) {
    return `${currency} ${formatedAmount}`;
  }

  return formatedAmount;
}
