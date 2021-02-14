import { gql } from 'apollo-boost';
import { UserFragment, TransactionFragment } from './fragments';

export const LoginMutation = gql`
mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
    user {
      ...UserFragment
    }
  }
}

${UserFragment}
`;

export const CreateTransaction = gql `
mutation($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    ...TransactionFragment
  }
}

${TransactionFragment}
`;

export const EditTransaction = gql `
mutation($id: Int!, $input: EditTransactionInput!) {
  editTransaction(id: $id, input: $input) {
    ...TransactionFragment
  }
}

${TransactionFragment}
`;

export const DeleteTransaction = gql`
mutation($id: Int!) {
  deleteTransaction(id: $id) {
    ...TransactionFragment
  }
}

${TransactionFragment}
`;