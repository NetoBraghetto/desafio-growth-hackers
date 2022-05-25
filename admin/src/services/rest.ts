import { AxiosPromise } from 'axios';

export type RequestStatuses = 'idle' | 'pending' | 'success' | 'error';

export interface Rest {
  get: () => AxiosPromise,
  find: (id: string | number) => AxiosPromise,
  save: (data: FormData | Record<string, any>) => AxiosPromise,
  store: (data: FormData | Record<string, any>) => AxiosPromise,
  update: (data: FormData | Record<string, any>) => AxiosPromise,
  delete: (id: number | string) => AxiosPromise,
}
