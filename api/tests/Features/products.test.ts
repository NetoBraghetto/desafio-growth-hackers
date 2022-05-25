import '../setup';
import request from 'supertest';
import { clearDatabase, closeDatabase, connect } from '../db';
import { IProduct, Product } from '../../src/models/Product';
import app from '../../src/app';
import { Category } from '../../src/models/Category';

function getCategory() {
  return Category.create({ name: 'Category 1' });
}

describe('Products features', () => {
  beforeAll(async () => connect());

  afterEach(async () => clearDatabase());

  afterAll(async () => closeDatabase());

  it('Should list products', async () => {
    const category = await getCategory();
    const inserts: IProduct[] = [
      { name: 'Product 1', price: 100, category_id: category._id },
      { name: 'Product 2', price: 100, category_id: category._id },
      { name: 'Product 3', price: 100, category_id: category._id },
    ];
    // const t = await Product.insertMany(inserts);
    await Product.insertMany(inserts);
    const response = await request(app).get(
      `/categories/${category._id}/products`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(inserts.length);
  });

  it('Should show single product', async () => {
    const category = await getCategory();
    const product = await Product.create({
      name: 'Product 1',
      price: 100,
      category_id: category._id,
    });
    const response = await request(app).get(
      `/categories/${category._id}/products/${product._id}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(product._id.toString());
  });

  it('Should validate on store product', async () => {
    const category = await getCategory();
    const response = await request(app)
      .post(`/categories/${category._id}/products`)
      .send({});
    expect(response.statusCode).toBe(422);
  });

  it('Should validate on update product', async () => {
    const category = await getCategory();
    const name = 'Product 1';
    const price = 200;
    const product = await Product.create({
      name,
      price,
      category_id: category._id,
    });

    const response = await request(app)
      .put(`/categories/${category._id}/products/${product._id}`)
      .send({ name: null });
    expect(response.statusCode).toBe(422);

    const prod = await Product.findById(product._id);
    expect(prod).not.toBeNull();
    expect(prod?.name).toBe(name);
    expect(prod?.price).toBe(price);
  });

  it('Should store a product', async () => {
    const category = await getCategory();
    const product = {
      name: 'Product 1',
      price: 100,
    };
    const response = await request(app)
      .post(`/categories/${category._id}/products`)
      .send(product);
    expect(response.statusCode).toBe(201);

    const viewResponse = await request(app).get(
      `/categories/${category._id}/products/${response.body._id}`,
    );
    expect(viewResponse.statusCode).toBe(200);
    expect(viewResponse.body.name).toBe(product.name);
    expect(viewResponse.body.price).toBe(product.price);
    expect(viewResponse.body.category_id).toBe(category._id.toString());
  });

  it('Should update a product', async () => {
    const category = await getCategory();
    const changes = {
      name: 'Changed',
      price: 50,
    };
    const product = await Product.create({
      name: 'Product 1',
      price: 100,
      category_id: category._id,
    });

    const response = await request(app)
      .put(`/categories/${category._id}/products/${product._id}`)
      .send(changes);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(changes.name);
    expect(response.body.price).toBe(changes.price);
  });

  it('Should delete a product', async () => {
    const category = await getCategory();
    const product = await Product.create({
      name: 'Product 1',
      price: 100,
      category_id: category._id,
    });

    const response = await request(app).delete(
      `/categories/${category._id}/products/${product._id}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(product._id.toString());

    const viewResponse = await request(app).get(
      `/categories/${category._id}/products/${product._id}`,
    );
    expect(viewResponse.statusCode).toBe(404);
  });
});
