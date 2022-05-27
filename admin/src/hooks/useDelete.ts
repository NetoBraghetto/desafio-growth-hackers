import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { IRestService, RequestStatuses } from 'services/rest';

export function useDelete<M extends {_id?: string, [key: string]: unknown}>(
  service: IRestService,
) : {
  deletingItem: M | false,
  deletingStatus: RequestStatuses,
  confirmDeletion: () => Promise<M>,
  setDeletionModalVisibility: (item: M | false) => void,
  } {
  const [deletingStatus, setDeletingStatus] = useState<RequestStatuses>('idle');
  const [deletingItem, setDeletingItem] = useState<M | false>(false);

  function confirmDeletion() : Promise<M> {
    setDeletingStatus('pending');
    return new Promise((resolve, reject) => {
      if (!deletingItem) {
        reject();
        return;
      }
      service.delete(deletingItem._id || '').then((res: AxiosResponse<M>) => {
        setDeletingStatus('idle');
        resolve(res.data);
      }).catch((err: AxiosError) => {
        setDeletingStatus('error');
        reject(err);
      });
    });
  }

  return {
    deletingItem,
    deletingStatus,
    confirmDeletion,
    setDeletionModalVisibility: setDeletingItem,
  };
}
