import { AxiosError, AxiosResponse } from 'axios';
import { TextInput } from 'components/form/TextInput';
import { LoadingWrapper } from 'components/LoadingWrapper';
import { useForm } from 'hooks/useForm';
import {
  FormEvent, useMemo,
} from 'react';
import {
  Col, Row,
} from 'react-bootstrap';
import api from 'services/api';
import { Product, ProductService } from 'services/productService';

export function ProductsForm({
  categoryId,
  onSubmitSuccess,
  onSubmitFail,
  id,
}: {
  categoryId: string;
  onSubmitSuccess?: (res: AxiosResponse<Product>) => void;
  onSubmitFail?: (err: AxiosError) => void;
  id?: string | number
}) {
  const productService = useMemo(() => new ProductService(api, `/categories/${categoryId}/products`), [categoryId]);
  const {
    state, status, link, submit,
  } = useForm<Product>(
    productService,
    productService.getNewModelInstance(),
    id,
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit({ ...state })
      .then(onSubmitSuccess)
      .catch(onSubmitFail);
  }

  return (
    <LoadingWrapper loading={status === 'pending'}>
      <form onSubmit={onSubmit}>
        <Row>
          <Col md={6}>
            <TextInput
              link={link('name')}
            />
          </Col>
        </Row>
      </form>
    </LoadingWrapper>
  );
}
