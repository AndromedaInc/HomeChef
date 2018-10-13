import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import 'cross-fetch/polyfill';
import styles from './style/main.css';
import Header from './Header';

import App from './app/app';

const client = new ApolloClient();

// import styles is needed for the CSS, but eslint
// doesn't like that it isn't being used. Thus the console.log...
console.log('need to keep styles:', styles);

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
  document.getElementById('app'),
);

export default client;
