import { AxiosResponse } from 'axios';
import { CategoriesForm } from 'components/categories/Form';
import { Table, TableColumn } from 'components/Table';
import { useDelete } from 'hooks/useDelete';
import { useList } from 'hooks/useList';
import { useState } from 'react';
import {
  Button, Col, Modal, Row,
} from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import categoryService, { Category } from 'services/categoryService';
import toastService from 'services/toastService';

export function CategoriesList() {
  const { collection, status, fetch } = useList<Category>(categoryService);
  const { deletingItem, setDeletionModalVisibility, confirmDeletion } = useDelete(categoryService);
  const [updatingCategory, setUpdatingModalVisibility] = useState<
    Category | false
  >(false);
  const columns: TableColumn[] = [
    {
      label: 'Nome',
      field: 'name',
      render: (category) => (
        <Link to={routes.categoriesView.path.replace(/:id/, category._id)}>
          {category.name}
        </Link>
      ),
    },
    {
      label: 'Editar',
      field: 'edit',
      thStyle: { width: '120px', textAlign: 'center' },
      render: (category) => (
        <div className="text-center">
          <Button
            onClick={setUpdatingModalVisibility.bind(null, category)}
            size="sm"
            variant="outline-primary"
          >
            <BsPencilSquare />
          </Button>
        </div>
      ),
    },
    {
      label: 'Excluir',
      field: 'delete',
      thStyle: { width: '120px', textAlign: 'center' },
      render: (category) => (
        <div className="text-center">
          <Button
            onClick={setDeletionModalVisibility.bind(null, category)}
            size="sm"
            variant="outline-danger"
          >
            <BsTrash />
          </Button>
        </div>
      ),
    },
  ];

  function deleteCategory() {
    confirmDeletion().then(() => {
      toastService.success('Categoria removida.', 'Sucesso');
      setDeletionModalVisibility(false);
      fetch();
    });
  }

  function onCategorySaveSuccess(res: AxiosResponse<Category>) {
    if (res.data._id) {
      toastService.success('Categoria alterada.', 'Sucesso');
      setUpdatingModalVisibility(false);
    } else {
      toastService.success('Categoria adicionada.', 'Sucesso');
    }
    fetch();
  }

  function renderUpdateModalContent() {
    if (!updatingCategory) {
      return null;
    }

    return (
      <Modal.Body>
        <CategoriesForm
          id={updatingCategory._id}
          onSubmitSuccess={onCategorySaveSuccess}
        />
      </Modal.Body>
    );
  }

  function renderDeleteModalContent() {
    if (!deletingItem) {
      return null;
    }

    return (
      <>
        <Modal.Body>
          <>
            Deseja excluir a categoria
            {' '}
            {deletingItem.name}
            {' '}
            ?
          </>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-2">
            <Button onClick={deleteCategory} variant="danger">
              Excluir
            </Button>
            <Button
              onClick={setDeletionModalVisibility.bind(null, false)}
              variant="white"
            >
              Fechar
            </Button>
          </div>
        </Modal.Footer>
      </>
    );
  }

  return (
    <div>
      <h1 className="display-6 fw-light mb-3">
        Listagem de
        {' '}
        <strong>Categorias</strong>
      </h1>
      <div className="mb-3">
        <Row>
          <Col sm={6}>
            <CategoriesForm onSubmitSuccess={onCategorySaveSuccess} />
          </Col>
        </Row>
      </div>
      <div className="mb-3">
        <Table
          loading={status === 'pending'}
          collection={collection}
          columns={columns}
        />
      </div>

      <Modal
        show={deletingItem !== false}
        onHide={setDeletionModalVisibility.bind(null, false)}
      >
        {renderDeleteModalContent()}
      </Modal>

      <Modal
        show={updatingCategory !== false}
        onHide={setUpdatingModalVisibility.bind(null, false)}
      >
        {renderUpdateModalContent()}
      </Modal>
    </div>
  );
}
