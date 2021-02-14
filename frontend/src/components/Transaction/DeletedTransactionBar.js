import React, { useRef, useEffect } from 'react';
import { AlertBar } from '../AlertBar';
import { clearDeletion } from '../../actions/transaction';

export const DeletedTransactionBar = ({ transaction, dispatch }) => {
  const transactionRef = useRef(transaction);
  useEffect(() => {
    if (transaction.id) {
      dispatch(clearDeletion)
    }
  }, [dispatch, transaction]);

  if ((!transaction || !transaction.id) && !transactionRef.current.id ) {
    return <></>;
  }

  return <AlertBar
    message={`Deleted '${transactionRef.current.title}' successfully.`}
    variant="success"
  />
}