const Sequelize = require('sequelize');
require('dotenv').config();

// const orm = new Sequelize('HomeChef', 'root', '', {
//   dialect: 'mysql',
// });

// const orm = new Sequelize({
//   host: `${process.env.DB_HOST}`,
//   user: `${process.env.DB_USER}`,
//   password: `${process.env.DB_PASS}`,
//   database: `${process.env.DB_DATABASE}`,
// });

const db = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_DATABASE}` : `${process.env.DB_DATABASE}`;
const user = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_USER}` : `${process.env.DB_USER}`;
const pass = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_PASS}` : `${process.env.DB_PASS}`;
const host = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_HOST}` : `${process.env.DB_HOST}`;


const orm = new Sequelize(
  db,
  user,
  pass,
  {
    host,
    dialect: 'mysql',
  },
);

orm
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

/* ///////////////////// */
/* MODELS (alphabetized) */
/* ///////////////////// */

const Chef = orm.define('chef', {
  city: Sequelize.TEXT,
  description: Sequelize.TEXT,
  email: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  username: Sequelize.STRING,
  stateName: Sequelize.TEXT,
  streetAddress: Sequelize.TEXT,
  zip: Sequelize.INTEGER,
  // payment_info: ?
  // rating: cached
});

const Event = orm.define('event', {
  date: Sequelize.STRING,
  startTime: Sequelize.STRING,
  endTime: Sequelize.STRING,
  // foreign key auto created: chefId
});

const ItemEvent = orm.define('itemEvent', {
  // foreign keys: eventId, menuItemId, chefId
  quantity: Sequelize.INTEGER,
  reservations: Sequelize.INTEGER,
});

const MenuItem = orm.define('menuItem', {
  // foreign keys: chefId
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.FLOAT,
  imageUrl: Sequelize.STRING,
});

const Order = orm.define('order', {
  // foreign keys: itemEventId, userId, transactionId
});

const Rating = orm.define('rating', {
  // foreign keys: chefId, userId
  stars: Sequelize.INTEGER,
  review: Sequelize.TEXT,
});

const Transaction = orm.define('transaction', {
  // foreign keys auto added: userId, chefId
  status: Sequelize.STRING,
  total: Sequelize.INTEGER, // or cached?
  tax: Sequelize.INTEGER, // or cached?
  fee: Sequelize.INTEGER, // or cached?
  tip: Sequelize.INTEGER, // or cached?
});

const User = orm.define('user', {
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  // payment_info: ?
});

// /* //////////////////////////// */
// /* RELATIONSHIPS (alphabetized) */
// /* //////////////////////////// */
Event.belongsTo(Chef);

ItemEvent.belongsTo(MenuItem);
ItemEvent.belongsTo(Event);
ItemEvent.belongsTo(Chef);

MenuItem.belongsTo(Chef);

Order.belongsTo(ItemEvent);
Order.belongsTo(Transaction);
Order.belongsTo(User);

Rating.belongsTo(Chef);
Rating.belongsTo(User);

Transaction.belongsTo(Chef);
Transaction.belongsTo(User);

// /* ///////////// */
// /* Create Tables */
// /* ///////////// */
orm.sync();

exports.connection = orm;
exports.Chef = Chef;
exports.Event = Event;
exports.ItemEvent = ItemEvent;
exports.MenuItem = MenuItem;
exports.Order = Order;
exports.Rating = Rating;
exports.Transaction = Transaction;
exports.User = User;

// try {
//   module.exports = database;
// } catch (err) {
//   console.log('caught an error', err);
// }
