import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import App from './App';
import store, { history, persistor } from './store';
import * as serviceWorker from './serviceWorker';
import { buildApiClient } from './api/client';

const apiClient = buildApiClient(store, history);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apiClient}>
      <PersistGate loading={null} persistor={persistor}>
        <App
          history={history}
        />
      </PersistGate>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
