import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { amber, green } from '@material-ui/core/colors';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const SnackbarContentWrapper = (props) => {
  const classes = useStyles1();
  const {
    className,
    message,
    variant,
    onClose,
    actionhandler,
    actiontext,
    ...other
  } = props;
  const Icon = variantIcon[variant];
  const extraAction = [];

  if (actiontext) {
    extraAction.push(<Button
      key={actiontext.toLowerCase()}
      color="secondary"
      size="small"
      onClick={actionhandler}>
        {actiontext}
      </Button>)
  }
  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        ...extraAction,
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose} >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
};

/**
 * Shows a snackbar
 * 
 * @param {success|error|warning}
 */
export const AlertBar = ({ message, variant, duration, ...other }) => {
  const [open, setOpen] = useState(true);
  return (<Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={duration || 5000}
    onClose={(_event, reason) => {
      if (reason === 'clickaway') return;
      setOpen(false)
    }}
  >
    <SnackbarContentWrapper
      {...other}
      variant={variant}
      message={message}
      onClose={() => setOpen(false)}
    />
  </Snackbar>);
}