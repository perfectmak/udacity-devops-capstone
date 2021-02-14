import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ConfirmDeletionDialog = ({ visible, loading, onConfirm, onCancel }) => {

  const onAgree = () => {
    if (onConfirm) { onConfirm(); }
  }

  const onDisagree = () => {
    if (onCancel) { onCancel(); }
  }

  return (<Dialog
    open={visible}
    onClose={onDisagree}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete this Item</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to perform this action?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {loading && <CircularProgress />}
      {!loading && <>
        <Button onClick={onDisagree} color="primary">
          No
        </Button>
        <Button onClick={onAgree} color="primary" autoFocus>
          Yes
        </Button>
      </>}
    </DialogActions>
  </Dialog>);
}