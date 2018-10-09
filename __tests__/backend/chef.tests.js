require('dotenv').config();
const mysql = require('mysql');
const request = require('supertest');
// const superagent = require('superagent')

// const agent = superagent.agent('localhost/');

// const fs = require('fs');
const app = require('./../../server/server');
const db = require('./../../database/database').connection;

process.env.NODE_ENV = 'test';
// let con;

// const seed = fs.readFileSync(`${__dirname}/../../database/seedManual.txt`, 'utf8');

/* **** PREPARE DATABASE FOR TESTING **** */

beforeAll(async () => {
  // const con = await mysql.createConnection({
  //   host: process.env.DB_TEST_HOST,
  //   user: process.env.DB_TEST_USER,
  //   password: process.env.DB_TEST_PASS,
  // });

  // console.log(process.env.DB_TEST_HOST, process.env.DB_TEST_USER, process.env.DB_TEST_PASS);

  // await con.connect(async (err) => {
  //   if (err) throw err;
  //   console.log('Connected!');
  //   await con.query('CREATE DATABASE homechef_test', (error, result) => {
  //     if (error) throw error;
  //     console.log('Database created');
  //   });
  // });

  // await con.destroy();
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
  // await db.query('SET FOREIGN_KEY_CHECKS = 0;');
  // await db.query('DROP TABLE ratings; DROP TABLE transactions;');
  // await db.query('DROP TABLE transactions;');
  // await db.query('DROP TABLE orders;');
  // await db.query('DROP TABLE itemEvents;');
  // await db.query('DROP TABLE menuItems;');
  // await db.query('DROP TABLE events;');
  // await db.query('DROP TABLE users;');
  // await db.query('DROP TABLE chefs;');
  // await db.query('SET FOREIGN_KEY_CHECKS = 1;');

  // const con = await mysql.createConnection({
  //   host: process.env.DB_TEST_HOST,
  //   user: process.env.DB_TEST_USER,
  //   password: process.env.DB_TEST_PASS,
  // });

  // const con2 = await mysql.createConnection({
  //   host: process.env.DB_TEST_HOST,
  //   user: process.env.DB_TEST_USER,
  //   password: process.env.DB_TEST_PASS,
  // });

  // await con2.connect((err) => {
  //   if (err) throw err;
  //   console.log('Connected in afterAll!');
  //   con.query('DROP DATABASE homechef_test', (error, result) => {
  //     if (error) throw error;
  //     console.log('Database dropped');
  //   });
  // });

  await db.close();
  // await con2.end();
});


/* **** TESTING SUITE **** */

// Super basic test to ensure the test suite is working
describe('GET /', () => {
  test('it should return a 200 status code', async () => {
    // console.log('agent is', agent);
    // console.log('CookieJar is', agent.TestAgent.jar.CookieJar);
    // console.log('get cookies', agent.TestAgent.jar.CookieJar.getCookies());
    // await agent
    //   .post('/chefauth')
    //   .send({
    //     username: 'mrchef12',
    //     password: 'secretpass',
    //   })
    //   // .then(() => console.log('agent now is', agent))
    //   .expect(302)
    //   .then(() => {
    //     agent.get('/');
    //   });
    // const response = await request(app).get('/');
    const response = await request(app)
      .get('/')
      // .set('Accept-Language', 'en')
      .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzkwNjAyNTMsImV4cCI6MTUzOTY2MDI1Mywic3ViIjoiMSJ9.E-zmt5dzBvlU7ZfQXeIZVsiLScTqAAdznq_pftCUKliUl2llczdcUmYSDXFwm9Ka2QGlq6RUciLVxfZt_TCASbkTmd8VBC5VVgOEKJrIk0VfrZxlLcTEtYhXTpOf6c0z-mJWNwVwLMNu2oMhP7AmZAkdIlWWljhdSGoCAVrfJHY');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/chef/accountInfo', async () => {
  const response = await request(app)
    .get('/api/chef/accountInfo')
    .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzkwNjAyNTMsImV4cCI6MTUzOTY2MDI1Mywic3ViIjoiMSJ9.E-zmt5dzBvlU7ZfQXeIZVsiLScTqAAdznq_pftCUKliUl2llczdcUmYSDXFwm9Ka2QGlq6RUciLVxfZt_TCASbkTmd8VBC5VVgOEKJrIk0VfrZxlLcTEtYhXTpOf6c0z-mJWNwVwLMNu2oMhP7AmZAkdIlWWljhdSGoCAVrfJHY')
    .query({ id: '1' });
  // console.log(response);
  expect(response.length).toBe(1);
  expect(response.data.name).toBe('Mr Chef');
});
