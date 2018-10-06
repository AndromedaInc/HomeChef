const request = require('supertest');
const app = require('../../server/server');

// Super basic test to ensure the test suite is working
describe('GET /', () => {
  test('it should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
