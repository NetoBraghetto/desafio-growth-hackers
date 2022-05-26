import { TextInput } from 'components/form/TextInput';
import { LoadingWrapper } from 'components/LoadingWrapper';
import { useForm } from 'hooks/useForm';
import {
  ChangeEvent,
  FormEvent, useEffect, useRef, useState,
} from 'react';
import {
  Button, Col, FormControl, InputGroup, Row,
} from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import categoryService, { Category } from 'services/categoryService';

export function CategoriesForm() {
  const { state, link } = useForm<Category>(categoryService, categoryService.getNewModelInstance());
  const [name, setName] = useState<string>('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!input.current) {
      return;
    }
    input.current.focus();
  });

  // function onChangeName(e: ChangeEvent<HTMLInputElement>) {
  //   setName(e.target.value);
  // }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // categoryService
  }

  const nameLink = link('name');

  return (
    <LoadingWrapper loading={false}>
      <form onSubmit={onSubmit}>
        <Row>
          <Col md={6}>
            <InputGroup>
              <TextInput
                link={link('name')}
                // ref={input}
                extraProps={{
                  ref: input,
                  placeholder: 'Digite o nome da categoria e pressione Enter',
                }}
              />
              {/* <FormControl onChange={onChangeName} value={name}  /> */}
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
