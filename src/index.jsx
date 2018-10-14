import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import 'cross-fetch/polyfill';
import './style/main.css';
import Header from './Header';

import App from './app/app';

const client = new ApolloClient();

const { document } = global;
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="grid-container">
          <Header />
          <App />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app') || document.createElement('div'), // 'div' for testing purposes
);

export default client;
