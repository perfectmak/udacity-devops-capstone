import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { AlertBar } from './AlertBar';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progressBar: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export const LoginForm = ({ login, authInProgress, authError }) => {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        login(email, password);
      }}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => { setEmail(e.target.value) }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => { setPassword(e.target.value) }}
      />
      {authInProgress && <Grid container justify="center">
        <CircularProgress className={classes.progressBar} />
      </Grid>}
      {!authInProgress && <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Login
      </Button>}
      {authError && <AlertBar message={authError} variant="error" />}
    </form>
  );
}
