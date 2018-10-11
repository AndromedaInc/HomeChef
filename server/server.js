require('babel-register');
require('dotenv').config();
require('babel-register');

/* **** CODE TO RESOLVE TESTING BUG WITH MYSQL - DO NOT MOVE OR CHANGE **** */
// relevant StackOverflow: https://stackoverflow.com/questions/46227783/encoding-not-recognized-in-jest-js

const iconv = require('iconv-lite'); // eslint-disable-line import/no-extraneous-dependencies
const encodings = require('iconv-lite/encodings'); // eslint-disable-line import/no-extraneous-dependencies

iconv.encodings = encodings;
/* **** END CODE TO DEBUG MYSQL + TEST **** */

/* **** Express modules **** */
const express = require('express');

const app = express();
const morgan = require('morgan');
const graphqlHTTP = require('express-graphql');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);

/* **** JWT and Authentication Modules **** */
const cookieParser = require('cookie-parser');

/* **** Server-side Rendering Modules **** */
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-dom');
const _ = require('lodash');
const fs = require('fs');
const bodyParser = require('body-parser');
const App = require('../src/app/app.jsx').default;

const { StaticRouter } = ReactRouter;
const baseTemplate = fs.readFileSync(`${__dirname}/../src/index.html`);
const template = _.template(baseTemplate); // returns a function

/* **** DB Connection modules **** */
const db = require('./../database/database');
const util = require('./util');
const auth = require('./auth');
const api = require('./api');
const gqlSchema = require('../graphQL/schema');

/* **** Apply universal middleware **** */
app.use('/public', express.static(`${__dirname}/../public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan({ format: 'dev' }));
app.use('/graphql', graphqlHTTP({ schema: gqlSchema, graphiql: true }));

/* **** Authentication **** */
app.post('/signup', auth.signup);
app.post('/login', auth.login);
app.post('/api/user/login', auth.userLogin);
app.post('/api/user/signup', auth.userSignup);

/* **** API **** */
// app.use('/api', auth.checkIfAuthenticated, api);
app.use('/api', api);

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

app.get('/api/chef/all', (req, res) => {
  db.Chef.findAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.get('/api/chef/schedule', (req, res) => {
  const chefId = req.query.id;
  db.ItemEvent.findAll({
    where: { chefId },
    include: [
      {
        model: db.Event,
        where: { chefId },
        attributes: ['id', 'date', 'startTime', 'endTime', 'chefId', 'createdAt', 'updatedAt'],
      },
      {
        model: db.MenuItem,
        where: { chefId },
        attributes: ['id', 'name', 'description', 'price', 'imageUrl', 'chefId'],
      },
    ],
  })
    .then((data) => {
      const schedule = util.organizeSchedule(data);
      res.send(schedule);
    })
    .catch(err => console.log(err));
});

app.get('/api/chef/menu', (req, res) => {
  const chefId = req.query.id;
  db.MenuItem.findAll({ where: { chefId } })
    .then((data) => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.post('/api/chef/menu/add', (req, res) => {
  const item = req.body;
  db.MenuItem.create({
    name: item.name,
    description: item.description,
    price: item.price,
    imageUrl: item.imageUrl,
    chefId: item.chefId,
  })
    .then((data) => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.post('/api/chef/menu/update', (req, res) => {
  const item = req.body;
  db.MenuItem.update(
    {
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
    },
    { where: { id: item.id } },
  )
    .then((data) => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.get('/api/chef/events', (req, res) => {
  const chefId = req.query.id;
  db.Event.findAll({ where: { chefId } })
    .then((data) => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.post('/api/chef/event/create', (req, res) => {
  const event = req.body;
  db.Event.create({
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    chefId: event.chefId,
  })
    .then((data) => {
      console.log('create event data', data);
      event.updatedMenuItems.forEach((item) => {
        db.ItemEvent.create({
          quantity: item.quantity,
          eventId: data.id,
          menuItemId: item.id,
          chefId: event.chefId,
          reservations: 0,
        });
      });
    })
    .then((data) => {
      console.log('create itemEvent data', data);
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.post('/api/chef/event/update', (req, res) => {
  // {eventId, date, startTime, endTime, chefId, menuItems:[{id, quantity}] }
  const event = req.body;
  db.Event.update(
    {
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
    },
    { where: { id: event.id } },
  )
    .then(() => {
      event.updatedMenuItems.forEach((item) => {
        db.ItemEvent.count({ where: { eventId: event.id, menuItemId: item.id } }).then((count) => {
          if (count === 1) {
            db.ItemEvent.update(
              { quantity: item.quantity },
              { where: { eventId: event.id, menuItemId: item.id } },
            );
          } else {
            db.ItemEvent.create({
              quantity: item.quantity,
              eventId: event.id,
              menuItemId: item.id,
              chefId: event.chefId,
              reservations: 0,
            });
          }
        });
      });
    })
    .then(() => res.end())
    .catch(err => console.log(err));
});

app.post('/api/user/reservation', (req, res) => {
  const event = req.body;
  // console.log('ln 230 server!!!!#$#$!', req.body);
  db.ItemEvent.update(
    { reservations: event.menuItem.reservations + event.quantity },
    { where: { eventId: event.id, menuItemId: event.menuItem.id } },
  )
    .then((data) => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

// STRIPE CHARGE
// TODO: update this post
app.post('/charge', async (req, res) => {
  console.log('in server charge REQ.BODY:', req.body);
  try {
    const { status } = await stripe.charges.create({
      amount: req.body.total.amount,
      currency: 'usd',
      description: 'HomeChef Transaction',
      source: req.body,
    });
    res.json({ status });
    console.log('in charge RES:', res);
  } catch (err) {
    res.status(500).end();
  }
});

/* **** Catch All - all server requests above here **** */
app.use(auth.checkIfAuthenticated, (req, res) => {
  console.log(req.url);
  const context = {};
  const body = ReactDOMServer.renderToString(
    // eslint-disable max-len
    React.createElement(StaticRouter, { location: req.url, context }, React.createElement(App)),
  );

  // TODO: read up on context.url and redirection (e.g. Brian Holt frontend masters)
  if (context.url) {
    res.redirect(301, context.url);
  }

  res.write(template({ body }));
  res.end();
});

/* ***** Error Handler ***** */
app.use((err, req, res, next) => {
  if (err.status === 401) {
    return res.redirect('/');
  }
  return next();
});

module.exports = app;
