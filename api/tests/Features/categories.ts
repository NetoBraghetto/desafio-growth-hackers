import request from 'supertest';
import app from '../../src/app';

describe('Categories features', () => {
  it('Should list categories', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
