import { Axios, AxiosPromise } from 'axios';
import api from './api';
import { Rest } from './rest';

export interface Category {
  _id?: string,
  name: string,
  createdAt: Date,
  updatedAt: Date,
}

export class CategoryService implements Rest {
  protected serviceRoute: string;

  protected client: Axios;

  constructor(client: Axios, serviceRoute: string) {
    this.client = client;
    this.serviceRoute = serviceRoute;
  }

  find(id: string | number): AxiosPromise {
    return this.client.get(`${this.serviceRoute}/${id}`);
  }

  get(): AxiosPromise {
    return this.client.get(this.serviceRoute);
  }

  store(data: FormData | Record<string, any>): AxiosPromise {
    return this.client.post(this.serviceRoute, data);
  }

  update(data: Record<string, any> | FormData): AxiosPromise {
    const id = data instanceof FormData
      ? data.get('id')
      : data.id;
    return this.client.put(`${this.serviceRoute}/${id}`, data);
  }

  delete(id: string | number): AxiosPromise {
    return this.client.delete(`${this.serviceRoute}/${id}`);
  }

  save(data: Record<string, any> | FormData): AxiosPromise {
    const id = data instanceof FormData
      ? data.get('id')
      : data.id;

    return id ? this.update(data) : this.store(data);
  }
}

const categoryService = new CategoryService(api, '/categories');

export default categoryService;
