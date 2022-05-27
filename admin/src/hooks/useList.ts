import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { IRestService, RequestStatuses } from 'services/rest';

export function useList<M>(
  service: IRestService,
) : {
  status: RequestStatuses,
  collection: M[],
  fetch: () => void,
  } {
  const [status, setStatus] = useState<RequestStatuses>('idle');
  const [collection, setCollection] = useState<M[]>([]);

  function fetch() {
    setStatus('pending');
    service.list().then((res: AxiosResponse<M[]>) => {
      setStatus('idle');
      setCollection(res.data);
    }).catch((err: AxiosError) => {
      setStatus('error');
      // Handle server error
    });
  }

  useEffect(() => {
    fetch();
  }, [service]);

  return {
    status,
    collection,
    fetch,
  };
}
