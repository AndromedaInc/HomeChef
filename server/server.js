require('babel-register');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-dom');
const _ = require('lodash');
const fs = require('fs');
const bodyParser = require('body-parser');
// const graphqlHTTP = require('express-graphql');
// const gqlSchema = require('./schema');
const App = require('../src/app/app').default;

const { StaticRouter } = ReactRouter;
const baseTemplate = fs.readFileSync(`${__dirname}/../src/index.html`);
const template = _.template(baseTemplate); // returns a function

const app = express();
const db = require('./../database/database');

const port = process.env.PORT || 5678;

app.use(
  '/public',
  (req, res, next) => console.log('in server') || next(),
  express.static(`${__dirname}/../public`),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// can play with GraphQL queries in the browser at localhost:5678/graphql
// app.use('/graphql', graphqlHTTP({
//   schema: gqlSchema,
//   graphiql: true,
// }));
app.get(
  '/api/user/accountInfo',
  (req, res, next) => console.log('get request to user/accountInfo') || next(),
  (req, res) => {
    const { username } = req.query;
    console.log('username is', username);
    db.User.findOne({ where: { username } })
      .then(accountInfo => res.status(200).send(accountInfo))
      .catch(err => console.log(err));
  },
);

app.get(
  '/api/chef/accountInfo',
  (req, res, next) => console.log('get request to chef/accountInfo') || next(),
  (req, res) => {
    const { username } = req.query;
    console.log('username is', username);
    db.Chef.findOne({ where: { username } })
      .then(accountInfo => res.status(200).send(accountInfo))
      .catch(err => console.log(err));
  },
);

app.get('/api/chef/all', (req, res) => {
  db.Chef.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.get('/api/chef/schedule', (req, res) => {
  console.log('REQ query!!! : ', req.query);
  const chefId = req.query.id;
  db.ItemEvent.findAll({
    include: [
      {
        model: db.Event,
        where: { chefId },
      },
      {
        model: db.MenuItem,
        where: { chefId },
      },
    ],
  })
    .then((data) => {
      console.log('data result!!!! : ', data);
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.get('/api/chef/menu', (req, res) => {
  // console.log('REQ query!!! : ', req.query);
  const chefId = req.query.id;
  db.MenuItem.findAll({ where: { chefId } })
    .then((data) => {
      // console.log('data: ', data);
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.post('/api/chef/menu', (req, res) => {
  // console.log('REQ query!!! : ', req.body);
  const item = req.body;
  db.MenuItem.create({
    name: item.name,
    description: item.description,
    price: item.price,
    imageUrl: item.imageUrl,
  })
    .then((data) => {
      // console.log('data: ', data);
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.get('/api/chef/events', (req, res) => {
  // console.log('REQ query!!! : ', req.query);
  const chefId = req.query.id;
  db.Event.findAll({ where: { chefId } })
    .then((data) => {
      // console.log('data: ', data);
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.post('/api/chef/event', (req, res) => {
  // console.log('REQ query!!! : ', req.body);
  const event = req.body;
  db.Event.create({
    name: event.name,
    description: event.description,
    price: event.price,
    imageUrl: event.imageUrl,
  })
    .then((data) => {
      // console.log('data: ', data);
      event.menuItems.forEach((item) => {
        db.ItemEvent.create({
          quantity: item.quantity,
          reservations: 0,
          eventId: data.id,
          menuItemId: item.id,
        });
      });
      res.send(data);
    })
    .catch(err => console.log(err));
});

// ALL SERVER REQUESTS ABOVE HERE
// Catch All:
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
