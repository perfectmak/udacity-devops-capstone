import { gql } from 'apollo-boost';
import { TransactionFragment, CategoryFragment } from './fragments';

export const TransactionConnectionQuery = gql`
query(
  $first: Int,
  $after: String,
  $last: Int,
  $before: String,
  $where: TransactionConnectionFilter
  $orderBy: TransactionConnectionOrderBy,
  $orderDirection: ConnectionOrderDirection) {
  transactionConnection(
    first: $first,
    after: $after,
    last: $last,
    before: $before,
    where: $where,
    orderBy: $orderBy,
    orderDirection: $orderDirection) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        ...TransactionFragment
      }
    }
  }
}

${TransactionFragment}
`;

export const GetCategoriesQuery = gql`
query($type: TransactionType!) {
  getCategories(type: $type) {
    ...CategoryFragment
  }
}

${CategoryFragment}
`;

export const DashboardQuery = gql`
query ($currentDate: Date!, $breakdownDate: Date!){
  monthSummary(date: $breakdownDate) {
    totalIncome
    totalExpense
    totalProfit
  }
  monthIncomeBreakdown: monthBreakdown(date: $breakdownDate, type: INCOME) {
    title
    amount
  }
  monthExpenseBreakdown: monthBreakdown(date: $breakdownDate, type: EXPENSE) {
    title
    amount
  }
  yearSummary(date: $currentDate) {
    date,
    totalIncome,
    totalExpense,
    totalProfit,
  }
}
`;