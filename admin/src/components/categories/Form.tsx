import { AxiosError, AxiosResponse } from 'axios';
import { TextInput } from 'components/form/TextInput';
import { LoadingWrapper } from 'components/LoadingWrapper';
import { useForm } from 'hooks/useForm';
import {
  ChangeEvent, FormEvent, useEffect, useRef, useState,
} from 'react';
import {
  Button, Col, FormControl, InputGroup, Row,
} from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import categoryService, { Category } from 'services/categoryService';

export function CategoriesForm({
  onSubmitSuccess,
  onSubmitFail,
  id,
}: {
  onSubmitSuccess?: (res: AxiosResponse<Category>) => void;
  onSubmitFail?: (err: AxiosError) => void;
  id?: string | number
}) {
  const {
    state, status, link, submit,
  } = useForm<Category>(
    categoryService,
    categoryService.getNewModelInstance(),
    id,
  );
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!input.current) {
      return;
    }
    input.current.focus();
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit({ ...state })
      .then((res) => {
        input.current?.focus();
        if (onSubmitSuccess) {
          onSubmitSuccess(res);
        }
      })
      .catch(onSubmitFail);
  }

  return (
    <LoadingWrapper loading={status === 'pending'}>
      <form onSubmit={onSubmit}>
        <Row>
          <Col md={6}>
            <InputGroup>
              <TextInput
                link={link('name')}
                extraProps={{
                  ref: input,
                  placeholder: 'Digite o nome da categoria e pressione Enter',
                }}
              />
              <Button type="submit" variant="outline-primary">
                <BsPlus />
                {' '}
                Adicionar
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </form>
    </LoadingWrapper>
  );
}
