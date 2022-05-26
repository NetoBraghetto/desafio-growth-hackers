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
// id?: number | string,
// onFetch?: (data: M) => M,
) : {
  status: RequestStatuses,
  state: M,
  // errors: FormErrors,
  link: ((field: keyof M, name?: string) => StateLinkable),
  // submit: (data: M) => Promise<AxiosResponse>,
  setStatus: (status: RequestStatuses) => void,
  } {
  const [status, setStatus] = useState<RequestStatuses>('idle');
  const [state, setState] = useState<M>(initialState);
  // const [errors, setErrors] = useState<FormErrors>({});

  // function onValidationError(validationErrors: ValidationError) {
  //   setStatus('error');
  //   const errors: FormErrors = {};
  //   validationErrors.inner.forEach((err: ValidationError) => {
  //     if (err.path) {
  //       errors[err.path] = err.message;
  //     }
  //   });
  //   setErrors(errors);
  // }

  function changeState(field: keyof M, value: unknown) {
    setState({
      ...state,
      [field]: value,
    });
  }

  function link(field: keyof M, name?: string) {
    return {
      name: name || field,
      value: state[field] || '',
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        changeState(field, e.target.value);
      },
    };
  }

  // function submit(data: M) : Promise<AxiosResponse> {
  //   setStatus('pending');
  //   setErrors({});
  //   return new Promise((resolve, reject) => {
  //     validationSchema.validate(state, { abortEarly: false }).then(() => {
  //       service.save(data).then((res: AxiosResponse) => {
  //         setStatus('success');
  //         resolve(res);
  //       }).catch((err: AxiosError) => {
  //         setStatus('error');
  //         reject(err); // Handle server error
  //       });
  //     })
  //       .catch(onValidationError);
  //   });
  // }

  // useEffect(() => {
  //   // return;
  //   if (!id) return;

  //   setStatus('pending');
  //   service.find(id).then((res: AxiosResponse) => {
  //     setStatus('idle');
  //     setState(onFetch ? onFetch(res.data) : res.data);
  //   }).catch((err: AxiosError) => {
  //     setStatus('error');
  //     // Handle server error
  //   });
  // }, [service, id, onFetch]);

  return {
    status,
    state,
    //   errors,
    setStatus,
    //   submit,
    link,
  };
}
