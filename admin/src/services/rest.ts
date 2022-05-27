import { Axios, AxiosPromise } from 'axios';

export type RequestStatuses = 'idle' | 'pending' | 'success' | 'error';

export interface IRestService {
  list: () => AxiosPromise,
  find: (id: string | number) => AxiosPromise,
  save: (data: FormData | Record<string, unknown>) => AxiosPromise,
  store: (data: FormData | Record<string, unknown>) => AxiosPromise,
  update: (data: FormData | Record<string, unknown>) => AxiosPromise,
  delete: (id: number | string) => AxiosPromise,
}

export abstract class RestService<M> implements IRestService {
  protected serviceRoute: string;

  protected client: Axios;

  constructor(client: Axios, serviceRoute: string) {
    this.client = client;
    this.serviceRoute = serviceRoute;
  }

  find(id: string | number): AxiosPromise<M> {
    return this.client.get(`${this.serviceRoute}/${id}`);
  }

  list(): AxiosPromise<M[]> {
    return this.client.get(this.serviceRoute);
  }

  store(data: FormData | Record<string, unknown>): AxiosPromise<M> {
    return this.client.post(this.serviceRoute, data);
  }

  update(data: FormData | Record<string, unknown>): AxiosPromise<M> {
    const id = data instanceof FormData
      ? data.get('_id')
      : data._id;
    return this.client.put(`${this.serviceRoute}/${id}`, data);
  }

  delete(id: string | number): AxiosPromise<M> {
    return this.client.delete(`${this.serviceRoute}/${id}`);
  }

  save(data: FormData | Record<string, unknown>): AxiosPromise<M> {
    const id = data instanceof FormData
      ? data.get('_id')
      : data._id;

    return id ? this.update(data) : this.store(data);
  }

  abstract getNewModelInstance(mergeProps: Record<keyof M, unknown>) : M
}
