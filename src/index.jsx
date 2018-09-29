import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

const { document } = global;
hydrate((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
