require('babel-register');
const express = require('express');
// const bodyparser = require('body-parser');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-dom');
const _ = require('lodash');
const fs = require('fs');
const App = require('../src/app/app').default;

const { StaticRouter } = ReactRouter;
const baseTemplate = fs.readFileSync(`${__dirname}/../src/index.html`);
const template = _.template(baseTemplate); // returns a function

const app = express();
const db = require('./../database/database.js');

const port = process.env.PORT || 5678;

app.use('/public', express.static(`${__dirname}/../public`));

// Test Database:
app.post('/test', (req, res) => {
  db.Chef.create({ name: 'sarah silva', username: 'chefsarah' });
  console.log('creating chef');
  res.end();
});

app.use((req, res) => {
  console.log(req.url);
  const context = {};
  const body = ReactDOMServer.renderToString(
    // eslint-disable max-len
    React.createElement(StaticRouter, { location: req.url, context }, React.createElement(App)),
  );

  if (context.url) {
    res.redirect(301, context.url);
  }

  res.write(template({ body }));
  res.end();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
