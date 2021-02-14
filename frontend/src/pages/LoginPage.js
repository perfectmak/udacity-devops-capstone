import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { LoginForm } from '../components/LoginForm';
import { loginUser, userIsLoggedIn } from '../actions/user';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://perfects.engineering/">
        Perfects.Engineering
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);

  if (userIsLoggedIn(user)) {
    const search = new URLSearchParams(history.location.search);
    history.push(search.get('redirectTo') || '/');
    return null;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <LoginForm login={dispatch(loginUser)} authInProgress={auth.inProgress} authError={auth.error} />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginPage;