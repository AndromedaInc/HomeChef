process.env.NODE_ENV = 'test';
const request = require('supertest');
const fs = require('fs');

// const jest = require('jest');

// jest.mock('../src/app/app');
const app = require('/Users/Stephan/Desktop/Hack-Reactor/HomeChef/server/server');

console.log(__dirname);
// const seed = fs.readFileSync('/Users/Stephan/Desktop/Hack-Reactor/HomeChef/database/seedManual.txt');
const seed = fs.readFileSync(`${__dirname}/../../database/seedManual.txt`);

console.log(seed);

// Super basic test to ensure the test suite is working
describe('GET /', () => {
  test('it should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
