import { Table, TableColumn } from 'components/Table';
import { useList } from 'hooks/useList';
import { useEffect, useMemo, useState } from 'react';
import { Button, Placeholder } from 'react-bootstrap';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import categoryService, { Category } from 'services/categoryService';
import { Product, ProductService } from 'services/productService';

export function CategoriesView() {
  const params = useParams<{id: string}>();
  const productService = useMemo(() => new ProductService(api, `/categories/${params.id}/products`), [params.id]);
  const [category, setCategory] = useState<Category>();
  const { collection, status } = useList<Product>(productService);
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
      render: () => (
        <div className="text-center">
          <Button
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
      render: () => (
        <div className="text-center">
          <Button
            size="sm"
            variant="outline-danger"
          >
            <BsTrash />
          </Button>

        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!params.id) return;

    categoryService.find(params.id)
      .then((res) => {
        setCategory(res.data);
      });
  }, [params.id]);

  if (!category) {
    return (
      <div>
        <div className="mb-5">
          <Placeholder as="h1" animation="glow">
            <div className="d-flex justify-content-between">
              <Placeholder xs={6} />
              {' '}
              <Placeholder.Button xs={1} aria-hidden="true" />
            </div>
          </Placeholder>
        </div>
        <Placeholder as="div" animation="glow">
          <Placeholder as="h1" xs={12} />
          {' '}
          <Placeholder xs={12} />
          {' '}
          <Placeholder xs={12} />
          {' '}
          <Placeholder xs={12} />
          {' '}
          <Placeholder xs={12} />
        </Placeholder>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-start justify-content-between">
        <h1 className="display-6 fw-light mb-3">
          { category.name }
        </h1>
        <Button>
          <BsPlus size={23} />
          {' '}
          Adicionar produto
        </Button>
      </div>
      <hr />
      <div className="mb-3">
        <h2 className="h4">Produtos associados</h2>
        <Table
          loading={status === 'pending'}
          collection={collection}
          columns={columns}
        />
      </div>
    </div>
  );
}
