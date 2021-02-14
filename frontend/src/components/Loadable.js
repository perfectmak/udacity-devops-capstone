import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import CircularProgress from '@material-ui/core/CircularProgress'
import { formatError } from '../util/handle-error';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  errorRoot: {
    background: '#eeeeee',
    padding: theme.spacing(2),
  },
  loading: {
    margin: theme.spacing(2),
  },
}));

export const Loadable = ({ loading, error, children }) => {
  const classes = useStyles();
  if (loading) {
    return (<CircularProgress className={classes.loading} />);
  }

  if (error) {
    return (<div className={classes.errorRoot}>
      <div>
        <SentimentVeryDissatisfiedIcon fontSize="large" />
      </div>
      {formatError(error)}
    </div>);
  }

  return children;
}