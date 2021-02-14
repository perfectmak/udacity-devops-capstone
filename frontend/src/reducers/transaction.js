const initalState = {
  newTransaction: {},
  deletedTransaction: {},
  categories: {
    INCOME: [],
    EXPENSE: [],
  },
  submitInProgress: false,
  deleteInProgress: false,
  error: null,
};

export const TransactionActions = {
  UpdateCategories: 'Transaction/UpdateCategories',
  Error: 'Transaction/Error',
  SubmitInProgress: 'Transaction/SubmitInProgress',
  SubmitSuccessful: 'Transaction/SubmitSuccessful',
  SubmitFailed: 'Transaction/SubmitFailed',
  ClearSubmission: 'Transaction/ClearSubmission',
  DeleteInProgress: 'Transaction/DeleteInProgress',
  DeleteSuccessful: 'Transaction/DeleteSuccessful',
  DeleteFailed: 'Transaction/DeleteFailed',
  ClearDeletion: 'Transaction/ClearDeletion',
};

export const transactionReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TransactionActions.UpdateCategories:
      return {
        ...state,
        categories: {
          ...state.categories,
          [payload.type]: payload.categories,
        },
        error: null,
      }
    case TransactionActions.Error:
      return {
        ...state,
        error: payload.error,
      }
    case TransactionActions.SubmitInProgress:
      return {
        ...state,
        error: null,
        submitInProgress: true,
        newTransaction: {},
      }
    case TransactionActions.SubmitSuccessful:
      return {
        ...state,
        error: null,
        submitInProgress: false,
        newTransaction: payload,
      }
    case TransactionActions.SubmitFailed:
      return {
        ...state,
        error: payload.error,
        submitInProgress: false,
      }
    case TransactionActions.ClearSubmission:
      return {
        ...state,
        submitInProgress: false,
        error: null,
        newTransaction: {},
      }
    case TransactionActions.DeleteInProgress:
        return {
          ...state,
          error: null,
          deleteInProgress: true,
          deletedTransaction: {},
        }
      case TransactionActions.DeleteSuccessful:
        return {
          ...state,
          error: null,
          deleteInProgress: false,
          deletedTransaction: payload,
        }
      case TransactionActions.DeleteFailed:
        return {
          ...state,
          error: payload.error,
          deleteInProgress: false,
        }
      case TransactionActions.ClearDeletion:
        return {
          ...state,
          submitInProgress: false,
          error: null,
          deletedTransaction: {},
        }
    default:
      return state;
  }
};
