import api from './api';
import { RestService } from './rest';

export interface Category {
  _id?: string,
  name: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export class CategoryService extends RestService<Category> {
  getNewModelInstance(mergeProps: Record<string | number | symbol, unknown> = {}): Category {
    return {
      name: '',
      ...mergeProps,
    };
  }
}

const categoryService = new CategoryService(api, '/categories');

export default categoryService;
