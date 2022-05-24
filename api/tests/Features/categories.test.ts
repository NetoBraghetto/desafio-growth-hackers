/* eslint-disable import/first */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './../../.env.testing') });
import request from 'supertest';
import { clearDatabase, closeDatabase, connect } from '../db';
import app from '../../src/app';
import { Category } from '../../src/models/Category';

describe('Categories features', () => {
  beforeAll(async () => connect());

  afterEach(async () => clearDatabase());

  afterAll(async () => closeDatabase());

  it('Should list categories', async () => {
    const inserts = [
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' },
    ];
    Category.insertMany(inserts);
    const response = await request(app).get('/categories');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(inserts.length);
  });

  it('Should show single category', async () => {
    const category = await Category.create({ name: 'Category 1' });
    const response = await request(app).get(`/categories/${category._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(category._id.toString());
  });

  it('Should validate on store category', async () => {
    const response = await request(app).post('/categories').send({});
    expect(response.statusCode).toBe(422);
  });

  it('Should validate on update category', async () => {
    const name = 'Category 1';
    const category = await Category.create({ name });

    const response = await request(app)
      .put(`/categories/${category._id}`)
      .send({ name: undefined });
    expect(response.statusCode).toBe(422);

    const cat = await Category.findById(category._id);
    expect(cat).not.toBeNull();
    expect(cat?.name).toBe(name);
  });

  it('Should store a category', async () => {
    const name = 'Category 11';
    const response = await request(app).post('/categories').send({ name });
    expect(response.statusCode).toBe(201);

    const viewResponse = await request(app).get(
      `/categories/${response.body._id}`,
    );
    expect(viewResponse.statusCode).toBe(200);
    expect(viewResponse.body.name).toBe(name);
  });

  it('Should update a category', async () => {
    const change = 'changed';
    const category = await Category.create({ name: 'Category 1' });

    const response = await request(app)
      .put(`/categories/${category._id}`)
      .send({ name: change });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(change);
  });

  it('Should delete a category', async () => {
    const category = await Category.create({ name: 'Category 1' });

    const response = await request(app).delete(`/categories/${category._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(category._id.toString());

    const viewResponse = await request(app).get(`/categories/${category._id}`);
    expect(viewResponse.statusCode).toBe(404);
  });
});
