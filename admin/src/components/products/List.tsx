import { AxiosError, AxiosResponse } from 'axios';
import { TextInput } from 'components/form/TextInput';
import { LoadingWrapper } from 'components/LoadingWrapper';
import { Table, TableColumn } from 'components/Table';
import { useDelete } from 'hooks/useDelete';
import { useForm } from 'hooks/useForm';
import { useList } from 'hooks/useList';
import {
  FormEvent, useMemo, useState,
} from 'react';
import {
  Button,
  Col, Modal, Row,
} from 'react-bootstrap';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import api from 'services/api';
import { Product, ProductService } from 'services/productService';
import toastService from 'services/toastService';
import { ProductsForm } from './Form';

export function ProductsList({
  categoryId,
}: {
  categoryId: string;
}) {
  const productService = useMemo(() => new ProductService(api, `/categories/${categoryId}/products`), [categoryId]);
  const { collection, status, fetch } = useList<Product>(productService);
  const { deletingItem, setDeletionModalVisibility, confirmDeletion } = useDelete(productService);
  const [formItem, setFormItemVisibility] = useState<
    Product | false
  >(false);
  const columns: TableColumn[] = [
    {
      label: 'Nome',
      field: 'name',
    },
    {
      label: 'Preço',
      field: 'price',
      render: (product) => (
        <span>
          R$
          { product.price }
        </span>
      ),
    },
    {
      label: 'Editar',
      field: 'edit',
      thStyle: { width: '120px', textAlign: 'center' },
      render: (product) => (
        <div className="text-center">
          <Button
            onClick={setFormItemVisibility.bind(null, product)}
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
      render: (product) => (
        <div className="text-center">
          <Button
            onClick={setDeletionModalVisibility.bind(null, product)}
            size="sm"
            variant="outline-danger"
          >
            <BsTrash />
          </Button>

        </div>
      ),
    },
  ];

  function addNewProduct() {
    setFormItemVisibility(productService.getNewModelInstance());
  }

  function deleteProduct() {
    confirmDeletion().then(() => {
      toastService.success('Produto removido.', 'Sucesso');
      setDeletionModalVisibility(false);
      fetch();
    });
  }

  function onProductSaveSuccess(res: AxiosResponse<Product>) {
    if (res.data._id) {
      toastService.success('Produto alterado.', 'Sucesso');
      setFormItemVisibility(false);
    } else {
      toastService.success('Produto adicionado.', 'Sucesso');
    }
    fetch();
  }

  function renderFormModalContent() {
    if (!formItem) {
      return null;
    }

    return (
      <>
        <Modal.Header>
          <Modal.Title>{formItem._id ? formItem.name : 'Novo produto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductsForm
            categoryId={categoryId}
            id={formItem._id}
            onSubmitSuccess={onProductSaveSuccess}
          />
        </Modal.Body>
      </>
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
            Deseja excluir a produto
            {' '}
            {deletingItem.name}
            {' '}
            ?
          </>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-2">
            <Button onClick={deleteProduct} variant="danger">
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
      <div className="d-flex align-items-start justify-content-between my-5">
        <h2 className="h4">Produtos associados</h2>
        <Button onClick={addNewProduct}>
          <BsPlus size={23} />
          {' '}
          Adicionar produto
        </Button>
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
        size="xl"
        show={formItem !== false}
        onHide={setFormItemVisibility.bind(null, false)}
      >
        { renderFormModalContent() }
      </Modal>
    </div>
  );
}
