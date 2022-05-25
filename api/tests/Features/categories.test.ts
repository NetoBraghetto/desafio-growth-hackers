import '../setup';
import request from 'supertest';
import { clearDatabase, closeDatabase, connect } from '../db';
import { Category, ICategory } from '../../src/models/Category';
import app from '../../src/app';

describe('Categories features', () => {
  beforeAll(async () => connect());

  afterEach(async () => clearDatabase());

  afterAll(async () => closeDatabase());

  it('Should list categories', async () => {
    const inserts: ICategory[] = [
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' },
    ];
    await Category.insertMany(inserts);
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
      .send({ name: null });
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
      .send({ name: change, vingo: 'dins' });
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
