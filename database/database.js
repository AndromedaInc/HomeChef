const Sequelize = require('sequelize');
require('dotenv').config();

const db = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_DATABASE}` : `${process.env.DB_DATABASE}`;
const user = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_USER}` : `${process.env.DB_USER}`;
const pass = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_PASS}` : `${process.env.DB_PASS}`;
const host = process.env.NODE_ENV === 'test' ? `${process.env.DB_TEST_HOST}` : `${process.env.DB_HOST}`;

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
  .then(() => {
    console.log('Database connection has been established successfully.');
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
  authId: Sequelize.INTEGER,
  username: Sequelize.STRING, // could take out and leave in authentication microservice
  stateName: Sequelize.TEXT,
  streetAddress: Sequelize.TEXT,
  zip: Sequelize.INTEGER,
  createdAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
});

const Event = orm.define('event', {
  // foreign key: chefId
  date: Sequelize.STRING,
  startTime: Sequelize.STRING,
  endTime: Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
});

const ItemEvent = orm.define('itemEvent', {
  // foreign keys: eventId, menuItemId, chefId
  quantity: Sequelize.INTEGER,
  reservations: Sequelize.INTEGER,
  createdAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
});

const MenuItem = orm.define('menuItem', {
  // foreign keys: chefId
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.FLOAT,
  imageUrl: Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
});

const User = orm.define('user', {
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  authId: Sequelize.INTEGER,
  email: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    allowNull: false,
  },
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

// /* ///////////// */
// /* Create Tables */
// /* ///////////// */
orm.sync();

exports.connection = orm;
exports.Chef = Chef;
exports.Event = Event;
exports.ItemEvent = ItemEvent;
exports.MenuItem = MenuItem;
exports.User = User;
