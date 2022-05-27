import { AxiosError, AxiosResponse } from 'axios';
import { TextInput } from 'components/form/TextInput';
import { LoadingWrapper } from 'components/LoadingWrapper';
import { useForm } from 'hooks/useForm';
import {
  FormEvent, useEffect, useRef,
} from 'react';
import {
  Button, InputGroup,
} from 'react-bootstrap';
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
        <InputGroup>
          <TextInput
            link={link('name')}
            extraProps={{
              ref: input,
              placeholder: 'Digite o nome da categoria e pressione Enter',
            }}
          />
          <Button type="submit" variant="outline-primary">
            Salvar
          </Button>
        </InputGroup>
      </form>
    </LoadingWrapper>
  );
}
