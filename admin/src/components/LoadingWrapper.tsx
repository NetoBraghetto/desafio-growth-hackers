import { ReactNode } from 'react';
import { Spinner } from 'react-bootstrap';

export function LoadingWrapper({ loading, children } : {loading: boolean, children: ReactNode}) {
  return (
    <div className="loading-wrapper">
      { loading ? <div className="loading-wrapper-element"><Spinner animation="grow" /></div> : null }
      { children }
    </div>
  );
}
