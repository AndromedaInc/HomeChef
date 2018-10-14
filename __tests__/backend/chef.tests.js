require('dotenv').config();
const request = require('supertest');

const app = require('./../../server/server');
const db = require('./../../database/database').connection;

process.env.NODE_ENV = 'test';

/* **** PREPARE DATABASE FOR TESTING **** */

beforeAll(async () => {
  await db.sync({ force: true });
});

beforeEach(async () => {
  // seed with some data
  // await db.query(seed);
  await db.query("INSERT INTO chefs (name, username, password, email, streetAddress, city, stateName, zip, description, imageUrl) VALUES ('Mr Chef', 'mrchef12', '$2b$10$dnFm3mDyObGaHvobWwgrT.y9lNSjI1XL8/6BiiYjYgnOZYvIMhS3i', 'mrchef@gmail.com','123 Street', 'CoffeeTown', 'CA', 99999, 'Awesome Chef!', 'image.com');");
  await db.query("INSERT INTO users (name, username, password, email, imageUrl) VALUES ('Francine', 'frannylikestoeat', 'password', 'franny@gmail.com', 'userimage.com');");
  await db.query("INSERT INTO events (date, startTime, endTime, chefId) VALUES ('2018-10-30', '11:00', '14:00', 1);");
  await db.query("INSERT INTO menuItems (name, description, price, imageUrl, chefId) VALUES ('Pad Thai', 'Tasty thai food!', 10, 'http://www.thaifoodandtravel.com/images/pad-thai-04.jpg', 1);");
  await db.query('INSERT INTO itemEvents (quantity, reservations, eventId, menuItemId, chefId) VALUES (20, 5, 1, 1, 1);');
  await db.query("INSERT INTO transactions (status, total, tax, fee, tip, userId, chefId) VALUES ('complete', 20, 2, 2, 2, 1, 1);");
  await db.query('INSERT INTO orders (itemEventId, userId, transactionId) VALUES (1, 1, 1);');
  await db.query("INSERT INTO ratings (stars, review, userId, chefId) VALUES (4, 'really nice chef. super good food.', 1, 1);");
  await db.query("INSERT INTO events (date, startTime, endTime, chefId) VALUES ('2018-10-31', '17:00', '20:00', 1);");
  await db.query("INSERT INTO menuItems (name, description, price, imageUrl, chefId) VALUES ('Pad See Ew', 'Fat noodles are good.', 10, 'https://thewoksoflife.com/wp-content/uploads/2017/02/pad-see-ew-9.jpg', 1);");
  await db.query('INSERT INTO itemEvents (quantity, reservations, eventId, menuItemId, chefId) VALUES (20, 2, 1, 1, 1);');
  await db.query('INSERT INTO itemEvents (quantity, reservations, eventId, menuItemId, chefId) VALUES (15, 5, 1, 1, 1);');
});

afterEach(async () => {
  await db.query('DELETE FROM ratings;');
  await db.query('DELETE FROM transactions;');
  await db.query('DELETE FROM orders;');
  await db.query('DELETE FROM itemEvents;');
  await db.query('DELETE FROM menuItems;');
  await db.query('DELETE FROM events;');
  await db.query('DELETE FROM users;');
  await db.query('DELETE FROM chefs;');
});

afterAll(async () => {
  await db.close();
});

/* **** TESTING SUITE **** */

// Super basic test to ensure the test suite is working
describe('GET /', () => {
  test('it should return a 200 status code', async () => {
    const response = await request(app)
      .get('/');
      // .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzkwNjAyNTMsImV4cCI6MTUzOTY2MDI1Mywic3ViIjoiMSJ9.E-zmt5dzBvlU7ZfQXeIZVsiLScTqAAdznq_pftCUKliUl2llczdcUmYSDXFwm9Ka2QGlq6RUciLVxfZt_TCASbkTmd8VBC5VVgOEKJrIk0VfrZxlLcTEtYhXTpOf6c0z-mJWNwVwLMNu2oMhP7AmZAkdIlWWljhdSGoCAVrfJHY');
    expect(response.statusCode).toBe(200);
  });
});

// two problems here: (1) getting past authentication wall and (2) getting supertest to work - .query does not seem to hit the endpoint with the right info

describe('GET /api/chef/accountInfo', async () => {
  const response = await request(app)
    .get('/api/chef/accountInfo?id=1');
    // .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzkwNjAyNTMsImV4cCI6MTUzOTY2MDI1Mywic3ViIjoiMSJ9.E-zmt5dzBvlU7ZfQXeIZVsiLScTqAAdznq_pftCUKliUl2llczdcUmYSDXFwm9Ka2QGlq6RUciLVxfZt_TCASbkTmd8VBC5VVgOEKJrIk0VfrZxlLcTEtYhXTpOf6c0z-mJWNwVwLMNu2oMhP7AmZAkdIlWWljhdSGoCAVrfJHY')
    // .query({ id: 1 });
  console.log('/api/chef/accountInfo response is', response.data);
  expect(response.data).toBe(1);
  expect(response.data.name).toBe('Mr Chef');
});

// describe('Database Tests', () => {
//   it('should find at least one user', async () => {
//     const users = await db.User.findAll();
//     expect(users).toBeGreaterThan(0);
//   });
//   it('should find at least one chef', async () => {
//     const chefs = await db.Chef.findAll();
//     expect(chefs).toBeGreaterThan(0);
//   });
// });
