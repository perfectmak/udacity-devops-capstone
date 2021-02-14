import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/styles';
import { ApolloConsumer } from '@apollo/react-hooks';
import {
  useQueryParams,
  StringParam,
} from 'use-query-params';
import { TransactionConnectionQuery } from '../../api/queries';
import { AlertBar } from '../../components/AlertBar';
import { firstCharToUpperCase } from '../../util/string-utils';
import { toTransactionType, transactionTitleSummarized } from '../../util/transactions-utils';
import { formatDateString, isValidDateString, formatDateToISO } from '../../util/date-utils';
import { formatCurrency } from '../../util/currency-utils';
import { DeletedTransactionBar } from '../../components/Transaction/DeletedTransactionBar';

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    margin: theme.spacing(1),
    float: 'right',
  },
}));

const pageSize = 15;

export const TransactionListPage = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const[pageResult, setPageResult] = useState([]);
  const dispatch = useDispatch();
  const transactionState = useSelector(state => state.transaction);
  const [urlState] = useQueryParams({ filterType: StringParam });
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <Grid container>
        <Grid container alignItems="center" >
          <Grid item xs={8}>
            <Typography variant="h6" component="h1" className={classes.header}>Transactions</Typography>
          </Grid>
          <Grid item xs={4}>
            <Link to={`/transactions/new?type=${toTransactionType(urlState.filterType)}`}>
              <Fab size="small" color="primary" aria-label="add" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ApolloConsumer key={urlState.filterType}>
            {(client) => {
              return (
                <MaterialTable
                  title={firstCharToUpperCase(urlState.filterType) || 'All'}
                  options={{
                    showFirstLastPageButtons: false,
                    pageSize,
                    pageSizeOptions: [],
                    debounceInterval: 800,
                  }}
                  columns={[
                    { title: "Date", field: "date" },
                    { title: "Title", field: "title" },
                    { title: "Amount ₦", field: "amount", type: "numeric" },
                  ]}
                  data={async ({ page, search }) => {
                    let searchOpts = {};
                    if (search) {
                      let OR = [];
                      const num = parseInt(search, 10);
                      if (isFinite(num)) {
                        if (num > 100) {
                          OR.push({ amount_eq: parseInt(num / 100, 10) });
                        }
                        OR.push({ quantity_eq: num });
                      }

                      OR.push({ title_contains: search });
                      OR.push({ description_contains: search });
                      if (isValidDateString(search)) {
                        OR.push({ date_eq: formatDateToISO(search) });
                      }
                      
                      if (OR.length !== 0) {
                        searchOpts.OR = OR;
                      }
                    }
                    let fetchOpts = { first: pageSize };
                    let direction = 'stay';
                    if (currentPage !== null) {
                      if (page > currentPage) {
                        direction = 'forward';
                      } else if (page < currentPage) {
                        direction = 'backward';
                      }
                    }

                    if (direction === 'forward') {
                      fetchOpts = {
                        first: pageSize,
                        after: pageResult.pageInfo.endCursor
                      };
                    } else if (direction === 'backward') {
                      fetchOpts = {
                        first: pageSize,
                        before: pageResult.pageInfo.startCursor
                      };
                    }

                    try {
                      const result = await client.query({
                        query: TransactionConnectionQuery,
                        variables: {
                          ...fetchOpts,
                          where: {
                            type_eq: toTransactionType(urlState.filterType) || undefined,
                            ...searchOpts,
                          }
                        },
                        fetchPolicy: 'network-only',
                      });

                      const data = result.data.transactionConnection;
                      
                      setError(null);
                      setCurrentPage(page);
                      setPageResult(data);

                      return {
                        page,
                        data: data.edges.map(({ node }) => ({
                          ...node,
                          title: transactionTitleSummarized(node),
                          amount: formatCurrency(node.amount),
                          date: formatDateString(node.date),
                        })),
                        totalCount: data.totalCount,
                      }
                    } catch (error) {
                      setError(error);
                      return {
                        page: (page === 0) ? page : page - 1,
                        data: [],
                        totalCount: pageResult.totalCount || 0,
                      }
                    }
                  }}
                  onRowClick={(_e, data) => {
                    history.push(`/transactions/${data.id}`);
                  }}
                />
              );
            }}
          </ApolloConsumer>
          
          {error && <AlertBar variant="error" message={error.message} />}
          <DeletedTransactionBar
            transaction={transactionState.deletedTransaction}
            dispatch={dispatch} />
        </Grid>
      </Grid>
    </div>
  );
}

export default TransactionListPage;