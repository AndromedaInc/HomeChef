const Sequelize = require('sequelize');
require('dotenv').config();
// const orm = new Sequelize('HomeChef', 'root', '', {
//   dialect: 'mysql',
// });

const orm = new Sequelize({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_DATABASE}`,
});

orm
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

exports.connection = orm;
