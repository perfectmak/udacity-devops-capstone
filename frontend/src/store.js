import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import { createBrowserHistory } from 'history';

import reducers from './reducers';

export const history = createBrowserHistory();

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);

// Middlewares
const middlewares = [thunk, historyMiddleware];

// Redux Logger
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['user'],
  timeout: null,
}

export const store = createStore(
  persistReducer(persistConfig, reducers(history)),
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default store;
