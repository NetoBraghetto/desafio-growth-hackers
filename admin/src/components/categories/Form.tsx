import { LoadingWrapper } from 'components/LoadingWrapper';
import { FormEvent } from 'react';
import {
  Button, Col, FormControl, InputGroup, Row,
} from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
// import categoryService from 'services/categoryService';

export function CategoriesForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // categoryService
  }

  return (
    <LoadingWrapper loading={false}>
      <form onSubmit={onSubmit}>
        <Row>
          <Col md={6}>
            <InputGroup>
              <FormControl placeholder="Digite o nome da categoria e pressione Enter" />
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
