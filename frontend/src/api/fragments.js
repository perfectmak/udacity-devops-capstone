import { gql } from 'apollo-boost';

export const UserFragment = gql`
fragment UserFragment on User {
  id email
}
`;

export const CategoryFragment = gql`
fragment CategoryFragment on Category {
  id title
}
`;

export const TransactionFragment = gql`
fragment TransactionFragment on Transaction {
    id
    title
    amount
    type
    category { ...CategoryFragment }
    # createdBy { id email }
    date
    quantity
    quantityUnit
    description
    createdAt
  }

  ${CategoryFragment}
`;