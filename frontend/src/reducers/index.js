import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { userReducer } from './user';
import { authReducer } from './auth';
import { transactionReducer } from './transaction';


export default history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    auth: authReducer,
    transaction: transactionReducer,
  });
