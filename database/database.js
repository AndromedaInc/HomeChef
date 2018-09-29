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

const orm = new Sequelize(`${process.env.DB_DATABASE}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
  host: `${process.env.DB_HOST}`,
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

/* ///////////////////// */
/* MODELS (alphabetized) */
/* ///////////////////// */

const Chef = orm.define('chef', {
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  address: Sequelize.TEXT,
  description: Sequelize.TEXT,
  imageUrl: Sequelize.STRING,
  // payment_info: ?
  // rating: cached
});

const Event = orm.define('event', {
  date: Sequelize.DATEONLY,
  startTime: Sequelize.STRING,
  endTime: Sequelize.STRING,
  // foreign key auto created: chefId
});

const ItemEvent = orm.define('itemEvent', {
  // foreign keys: eventId, menuItemId
  quantity: Sequelize.INTEGER,
  reservations: Sequelize.INTEGER,
});

const MenuItem = orm.define('menuItem', {
  // foreign keys: chefId
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.INTEGER,
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
  imageUrl: Sequelize.STRING,
  // payment_info: ?
});

// /* //////////////////////////// */
// /* RELATIONSHIPS (alphabetized) */
// /* //////////////////////////// */

Chef.hasMany(Event);
Chef.hasMany(MenuItem);
Chef.hasMany(Rating);
Chef.hasMany(Transaction);

Event.hasOne(Chef);
Event.hasMany(ItemEvent);
Event.hasMany(Order);

ItemEvent.hasOne(MenuItem);
ItemEvent.hasOne(Event);

MenuItem.hasOne(Chef);
MenuItem.hasMany(Order);
MenuItem.hasOne(ItemEvent);

Order.hasOne(ItemEvent);
Order.hasOne(Transaction);
Order.hasOne(User);

Rating.hasOne(Chef);
Rating.hasOne(User);

Transaction.hasOne(Chef);
Transaction.hasMany(Order);
Transaction.hasOne(User);

User.hasMany(Order);
User.hasMany(Rating);
User.hasMany(Transaction);

// /* ///////////// */
// /* Create Tables */
// /* ///////////// */
User.sync();
Chef.sync();
Rating.sync();
MenuItem.sync();
Event.sync();
Transaction.sync();
ItemEvent.sync();
Order.sync();

exports.connection = orm;
exports.Chef = Chef;
exports.Event = Event;
exports.ItemEvent = ItemEvent;
exports.MenuItem = MenuItem;
exports.Order = Order;
exports.Rating = Rating;
exports.Transaction = Transaction;
exports.User = User;
