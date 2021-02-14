import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { TransactionForm } from '../../components/Transaction/TransactionForm';
import { fetchCategoriesByType, clearSubmission, submitEditTransaction } from '../../actions/transaction';
import { AlertBar } from '../../components/AlertBar';
import { useQuery } from '@apollo/react-hooks';
import { TransactionConnectionQuery } from '../../api/queries';

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

export const EditTransactionPage = (props) => {
  const { match } = props;
  const { id: transactionId } = match.params;
  const [selectedType, setSelectedType] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const transactionState = useSelector(state => state.transaction);
  let transaction = { };

  useEffect(() => {
    if (selectedType) {
      dispatch(fetchCategoriesByType)(selectedType);
    }
  }, [dispatch, selectedType]);

  useEffect(() => {
    if (transactionState.newTransaction && transactionState.newTransaction.id) {
      dispatch(clearSubmission);
      history.replace(`/transactions/${transactionState.newTransaction.id}`);
    }
  }, [history, transactionState, dispatch]);

  const { data, error, loading } = useQuery(TransactionConnectionQuery, {
    variables: {
      where: {
        id_eq: parseInt(transactionId),
      }
    },
  });

  if (!error && !loading) {
    const transactions = data.transactionConnection.edges;
    if (transactions.length === 0) {
      return (<div>
        <CssBaseline />
        <Paper>
          <Typography variant="h4">Transaction doesn't exist</Typography>
        </Paper>
      </div>);
    } else {
      transaction = transactions[0].node;
      if (selectedType == null) {
        setSelectedType(transaction.type);
      }
      // patch category id
      transaction.categoryId = transaction.category.id;
    }
  }

  const onTypeChange = (type) => {
    setSelectedType(type);
  }

  const onFormSubmit = (values) => {
    dispatch(submitEditTransaction)(transactionId, values);
  }

  return (<div>
    <CssBaseline />
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <Typography variant="h6" component="h1" className={classes.header}>
          Edit transaction #{transactionId}
        </Typography>
        <Paper className={classes.root}>
          {loading && <CircularProgress />}
          {!loading && !error && <TransactionForm
            transaction={transaction}
            onTypeChange={onTypeChange}
            categories={transactionState.categories[selectedType || transaction.type]}
            onSubmit={onFormSubmit}
            isSubmitting={transactionState.submitInProgress}
            />}
        </Paper>
        {transactionState.error && <AlertBar message={transactionState.error} variant="error" />}
        {error && <AlertBar variant="error" message={error.message} />}
      </Grid>
    </Grid>
  </div>);
}

export default EditTransactionPage;