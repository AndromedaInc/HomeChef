const Sequelize = require('sequelize');

const orm = new Sequelize('HomeChef', 'root', '', {
  dialect: 'mysql',
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
