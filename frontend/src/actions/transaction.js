import { createAction } from '../util/redux-utils';
import { TransactionActions } from '../reducers/transaction';
import { GetCategoriesQuery } from '../api/queries';
import { CreateTransaction, DeleteTransaction, EditTransaction } from '../api/mutations';
import { apiClient } from '../api/client';
import { toTransactionType, parseTransactionFormInput } from '../util/transactions-utils';
import { formatError } from '../util/handle-error';

export const fetchCategoriesByType = (dispatch) => async (type) => {
  apiClient.query({
    query: GetCategoriesQuery,
    variables: { type: toTransactionType(type) },
  })
  .then(result => {
    const categories = result.data.getCategories;
    dispatch(createAction(TransactionActions.UpdateCategories, { type, categories }));
  })
  .catch(error => {
    dispatch(createAction(TransactionActions.Error, { error: formatError(error) }))
  })
}

export const submitNewTransaction = (dispatch) => async (values) => {
  dispatch(createAction(TransactionActions.SubmitInProgress))
  try {
    const input = parseTransactionFormInput(values);
    const result = await apiClient.mutate({
      mutation: CreateTransaction,
      variables: { input, },
    });
    const transaction = result.data.createTransaction;
    dispatch(createAction(TransactionActions.SubmitSuccessful, transaction));
  } catch (error) {
    dispatch(createAction(TransactionActions.SubmitFailed, { error: formatError(error) }));
  }
};

export const submitEditTransaction = (dispatch) => async (id, values) => {
  dispatch(createAction(TransactionActions.SubmitInProgress))
  try {
    const input = parseTransactionFormInput(values);
    const result = await apiClient.mutate({
      mutation: EditTransaction,
      variables: { id: parseInt(id, 10), input },
    });
    const transaction = result.data.editTransaction;
    dispatch(createAction(TransactionActions.SubmitSuccessful, transaction));
  } catch (error) {
    dispatch(createAction(TransactionActions.SubmitFailed, { error: formatError(error) }));
  }
};

export const clearSubmission = createAction(TransactionActions.ClearSubmission);

export const deleteTransaction = (dispatch) => async (transactionId) => {
  dispatch(createAction(TransactionActions.DeleteInProgress))
  try {
    const result = await apiClient.mutate({
      mutation: DeleteTransaction,
      variables: { id: parseInt(transactionId, 10) },
    });
    const transaction = result.data.deleteTransaction;
    dispatch(createAction(TransactionActions.DeleteSuccessful, transaction));
  } catch (error) {
    dispatch(createAction(TransactionActions.DeleteFailed, { error: formatError(error) }));
  }
}

export const clearDeletion = createAction(TransactionActions.ClearDeletion);