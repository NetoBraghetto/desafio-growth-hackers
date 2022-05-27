import { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { IRestService, RequestStatuses } from 'services/rest';

export type FormErrors = Record<string, string>;

export type StateLinkable = {
  name: string,
  value: unknown,
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export function useForm<M>(
  service: IRestService,
  initialState: M,
  id?: number | string,
) : {
  status: RequestStatuses,
  state: M,
  errors: FormErrors,
  link: ((field: keyof M, name?: string) => StateLinkable),
  submit: (data: FormData | Record<string, unknown>) => Promise<AxiosResponse>,
  setStatus: (status: RequestStatuses) => void,
  } {
  const [status, setStatus] = useState<RequestStatuses>('idle');
  const [state, setState] = useState<M>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  function changeState(field: keyof M, value: unknown) {
    setState({
      ...state,
      [field]: value,
    });
  }

  function link(field: keyof M, name?: string) {
    return {
      name: name || field.toString(),
      value: state[field] || '',
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        changeState(field, e.target.value);
      },
    };
  }

  function submit(data: FormData | Record<string, unknown>) : Promise<AxiosResponse<M>> {
    setStatus('pending');
    setErrors({});
    return new Promise((resolve, reject) => {
      service.save(data).then((res: AxiosResponse<M>) => {
        setStatus('success');
        setState(initialState);
        resolve(res);
      }).catch((err: AxiosError) => {
        setStatus('error');
        reject(err); // Handle server error
      });
    });
  }

  useEffect(() => {
    if (!id) return;

    setStatus('pending');
    service.find(id).then((res: AxiosResponse<M>) => {
      setStatus('idle');
      setState(res.data);
    }).catch((err: AxiosError) => {
      setStatus('error');
      // Handle server error
    });
  }, [service, id]);

  return {
    status,
    state,
    errors,
    setStatus,
    submit,
    link,
  };
}
