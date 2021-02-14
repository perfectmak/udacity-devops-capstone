import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/react-hooks';
import { TransactionConnectionQuery } from '../../api/queries';
import { AlertBar } from '../../components/AlertBar';
import { TitleValueInfo } from '../../components/TitleValueInfo';
import { formatDateString } from '../../util/date-utils';
import { formatCurrency } from '../../util/currency-utils';
import { ConfirmDeletionDialog } from '../../components/ConfirmDeletionDialog';
import { deleteTransaction } from '../../actions/transaction';
import { formatQuantityUnit } from '../../util/transactions-utils';

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

export const TransactionDetailPage = (props) => {
  const { match } = props;
  const { id: transactionId } = match.params;

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const transactionState = useSelector(state => state.transaction);
  const [deleteDialogVisible, setDeleteDialogVisiblity] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  useEffect(() => {
    if (transactionState.deletedTransaction.id) {
      history.replace(`/transactions?filterType=${transactionState.deletedTransaction.type}`);
    }
  }, [history, transactionState]);

  const { data, error, loading } = useQuery(TransactionConnectionQuery, {
    variables: {
      where: {
        id_eq: parseInt(transactionId),
      }
    },
  });

  let transaction = {};
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
    }
  }

  if (error) {
    return <AlertBar message={error.message} variant="error" />
  }

  const onDeleteClicked = (e) => {
    setDeleteInProgress(false);
    setDeleteDialogVisiblity(true);
  }

  const onDeleteConfirmed = () => {
    setDeleteInProgress(true);
    dispatch(deleteTransaction)(transactionId);
  };

  return (<div>
    <CssBaseline/>
    {<Grid container justify="center">
      <Grid item xs={12} md={8}>
        {!loading && !error && <Typography variant="h6" component="h1" className={classes.header}>
          Transaction #{transaction.id}
        </Typography>}
        <Paper className={classes.root}>
          {loading && <CircularProgress />}
          {!loading && <div>
            <Grid container>
              <Grid item xs={6}>
                <TitleValueInfo title="Date" value={formatDateString(transaction.date)} />
              </Grid>
              <Grid item xs={6}>
                <TitleValueInfo title="Type" value={transaction.type} />
              </Grid>
            </Grid>
            <TitleValueInfo title="Title" value={transaction.title} />
            <Divider />
            <Grid container>
              <Grid item xs={6}>
                <TitleValueInfo title="Amount" value={formatCurrency(transaction.amount, { includeCurrency: true })} />
              </Grid>
              <Grid item xs={6}>
                <TitleValueInfo title="Category" value={transaction.category.title} />
              </Grid>
            </Grid>
            {transaction.description && <>
              <Divider />
              <TitleValueInfo title="Full Description" value={transaction.description} />
            </>}
            {transaction.quantity && <>
              <Divider />
              <TitleValueInfo title="Quantity" value={formatQuantityUnit(transaction.quantityUnit, transaction.quantity)} />
            </>}
          </div>}
        </Paper>
        {!loading && <Grid container spacing={1} className={classes.buttons}>
          <Grid item xs={6}>
            <Button fullWidth color="secondary" variant="contained" onClick={onDeleteClicked} className={classes.deleteButton}>
              Delete
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Link to={`/transactions/${transaction.id}/edit`}>
              <Button fullWidth color="primary" variant="contained">Edit</Button>
            </Link>
          </Grid>
        </Grid>}
      </Grid>
    </Grid>}
    <ConfirmDeletionDialog
      visible={deleteDialogVisible}
      loading={deleteInProgress}
      onConfirm={onDeleteConfirmed}
      onCancel={() => setDeleteDialogVisiblity(false)}
    />
  </div>);
};

export default TransactionDetailPage;