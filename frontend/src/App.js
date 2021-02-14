import React, { Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { QueryParamProvider } from 'use-query-params';

import { userIsLoggedIn, logoutUser } from './actions/user';
import { Header } from './components/Header/Header';
import { NotFoundPage } from './components/NotFoundPage';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const TransactionListPage = lazy(() => import('./pages/transactions/TransactionListPage'));
const TransactionDetailPage = lazy(() => import('./pages/transactions/TransactionDetailPage'));
const CreateTransactionPage = lazy(() => import('./pages/transactions/CreateTransactionPage'));
const EditTransactionPage = lazy(() => import('./pages/transactions/EditTransactionPage'));

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ed3f46',
    },
    secondary: {
      main: '#ffffff',
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    minHeight: '100vh'
  },
}));

const App = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  return (
    <div className={`App ${classes.root}`}>
      <ThemeProvider theme={appTheme} >
        <ConnectedRouter history={props.history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Header isLoggedIn={userIsLoggedIn(user)} logout={dispatch(logoutUser)}>
              <Grid container>
                <Grid item xs={12}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                      <Route key="home" path="/" component={DashboardPage} exact={true} />
                      <Route key="login" path="/login" component={LoginPage} exact={true} />
                      <Route key="transactions" path="/transactions" component={TransactionListPage} exact={true} />
                      <Route key="new-transaction" path="/transactions/new" component={CreateTransactionPage} exact={true} />
                      <Route key="view-transaction" path="/transactions/:id/edit" component={EditTransactionPage} exact={true} />
                      <Route key="view-transaction" path="/transactions/:id" component={TransactionDetailPage} exact={true} />
                      <Route key="notFound" path="*" component={NotFoundPage} is404={true} />
                    </Switch>
                  </Suspense>
                </Grid>
              </Grid>
            </Header>
          </QueryParamProvider>
        </ConnectedRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
