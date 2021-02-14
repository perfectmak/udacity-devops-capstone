import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export const TitleValueInfo = ({ title, value }) => {
  const classes = useStyles();

  return (<div className={classes.root}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body1">{value}</Typography>
  </div>);
};
