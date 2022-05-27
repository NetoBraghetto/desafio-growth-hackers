import { RestService } from './rest';

export interface Product {
  _id?: string,
  name: string,
  price: number,
  category_id: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export class ProductService extends RestService<Product> {
  getNewModelInstance(mergeProps: Record<string | number | symbol, unknown> = {}): Product {
    return {
      name: '',
      price: 0,
      category_id: '',
      ...mergeProps,
    };
  }
}
