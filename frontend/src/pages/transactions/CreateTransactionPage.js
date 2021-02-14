import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/styles';
import { useQueryParams, StringParam } from 'use-query-params';
import { TransactionForm } from '../../components/Transaction/TransactionForm';
import { toTransactionType, EXPENSE_TX_TYPE } from '../../util/transactions-utils';
import { fetchCategoriesByType, submitNewTransaction, clearSubmission } from '../../actions/transaction';
import { AlertBar } from '../../components/AlertBar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
  deleteButton: {
    marginRight: theme.spacing(1),
  }
}));

const transactionCreated = transaction => transaction && transaction.id;

export const CreateTransactionPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const transactionState = useSelector(state => state.transaction);
  const [urlState, setUrlState] = useQueryParams({ type: StringParam });
  const selectedType = (toTransactionType(urlState.type) || EXPENSE_TX_TYPE);
  const [transaction, setTransaction] = useState({ type: selectedType });
  const [createdTransaction, setCreatedTransaction] = useState(null);

  useEffect(() => {
    dispatch(fetchCategoriesByType)(selectedType);
  }, [dispatch, selectedType]);

  useEffect(() => {
    if (transactionCreated(transactionState.newTransaction)) {
      setCreatedTransaction(transactionState.newTransaction);
      // reset form
      setTransaction({
        formKey: `${Date.now()}`,
        type: selectedType,
        date: transactionState.newTransaction.date,
      });
      dispatch(clearSubmission);
    }
  }, [history, transactionState, dispatch, selectedType]);

  const onTypeChange = (type) => {
    setUrlState({ type });
  }

  const onFormSubmit = (values) => {
    dispatch(submitNewTransaction)(values);
  }

  return (<div>
    <CssBaseline />
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <Typography variant="h6" component="h1" className={classes.header}>
          New Transaction
        </Typography>
        <Paper className={classes.root}>
          <TransactionForm
            transaction={transaction}
            onTypeChange={onTypeChange}
            categories={transactionState.categories[selectedType]}
            onSubmit={onFormSubmit}
            isSubmitting={transactionState.submitInProgress}
            />
        </Paper>
        {transactionState.error && <AlertBar message={transactionState.error} variant="error" />}
        {createdTransaction && <AlertBar
          key={`${createdTransaction.id}`}
          message={`Transaction #${createdTransaction.id} Created`}
          variant="success"
          actiontext="View"
          actionhandler={() => {
            history.replace(`/transactions/${createdTransaction.id}`);
          }}
        />}
      </Grid>
    </Grid>
  </div>);
}

export default CreateTransactionPage;