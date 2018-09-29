require('babel-register');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-dom');
const _ = require('lodash');
const fs = require('fs');
// const graphqlHTTP = require('express-graphql');
// const { GraphQLServer } = require('graphql-yoga');
const bodyParser = require('body-parser');
// const gqlSchema = require('./schema.js');
const App = require('../src/app/app').default;

const { StaticRouter } = ReactRouter;
const baseTemplate = fs.readFileSync(`${__dirname}/../src/index.html`);
const template = _.template(baseTemplate); // returns a function

const app = express();
// const db = require('./../database/database.js');

const port = process.env.PORT || 5678;

app.use('/public', express.static(`${__dirname}/../public`));
app.use(bodyParser.json());

// can play with GraphQL queries in the browser at localhost:5678/graphql
// app.use('/graphql', graphqlHTTP({
//   schema: gqlSchema.schema,
//   resolvers: '/resolvers.js',
//   graphiql: true,
// }));

// const server = new GraphQLServer({
//   typeDefs: './server/schema.graphql',
//   resolvers: './server/resolvers.js',
// });
// server.start(() => console.log('Server is running on http://localhost:4000'));

app.use((req, res) => {
  console.log(req.url);
  const context = {};
  const body = ReactDOMServer.renderToString(
    // eslint-disable max-len
    React.createElement(
      StaticRouter,
      { location: req.url, context },
      React.createElement(App)
    )
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
