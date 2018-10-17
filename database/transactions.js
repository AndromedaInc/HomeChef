const Sequelize = require('sequelize');
require('dotenv').config();

const db = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_DATABASE}` : `${process.env.DB_DATABASE_TRANS}`;
const user = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_USER}` : `${process.env.DB_USER_TRANS}`;
const pass = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_PASS}` : `${process.env.DB_PASS_TRANS}`;
const host = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_HOST}` : `${process.env.DB_HOST_TRANS}`;

console.log('process.env.NODE_ENV is', process.env.NODE_ENV);

const orm = new Sequelize(
  db,
  user,
  pass,
  {
    logging: false,
    host,
    dialect: 'mysql',
  },
);

orm
  .authenticate()
  .then(() => console.log('Transactions Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the transaction database:', err));

const Order = orm.define('order', {
  // foreign keys: itemEventId, userId, transactionId
  itemEventId: { type: Sequelize.INTEGER, allowNull: false },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  transactionId: { type: Sequelize.INTEGER },
  createdAt: { type: 'TIMESTAMP', allowNull: false },
  updatedAt: { type: 'TIMESTAMP', allowNull: false },
});

const Transaction = orm.define('transaction', {
  // foreign keys: userId, chefId
  userId: { type: Sequelize.INTEGER, allowNull: false },
  chefId: { type: Sequelize.INTEGER, allowNull: false },
  status: Sequelize.STRING,
  total: Sequelize.FLOAT,
  tax: Sequelize.FLOAT,
  fee: Sequelize.FLOAT,
  tip: Sequelize.FLOAT,
  createdAt: { type: 'TIMESTAMP', allowNull: false },
  updatedAt: { type: 'TIMESTAMP', allowNull: false },
});

orm.sync();

exports.Order = Order;
exports.Transaction = Transaction;
