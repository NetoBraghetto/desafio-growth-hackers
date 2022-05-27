import { CategoriesForm } from 'components/categories/Form';
import { Table, TableColumn } from 'components/Table';
import { useList } from 'hooks/useList';
import { Button } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import categoryService, { Category } from 'services/categoryService';

export function CategoriesList() {
  const { collection, status, fetch } = useList<Category>(categoryService);
  const columns: TableColumn[] = [
    {
      label: 'Nome',
      field: 'name',
      render: (category) => (
        <Link to={routes.categoriesView.path.replace(/:id/, category._id)}>{ category.name }</Link>
      ),
    },
    {
      label: 'Editar',
      field: 'edit',
      thStyle: { width: '120px', textAlign: 'center' },
      render: () => (
        <div className="text-center"><Button size="sm" variant="outline-primary"><BsPencilSquare /></Button></div>
      ),
    },
    {
      label: 'Excluir',
      field: 'delete',
      thStyle: { width: '120px', textAlign: 'center' },
      render: () => (
        <div className="text-center"><Button size="sm" variant="outline-danger"><BsTrash /></Button></div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="display-6 fw-light mb-3">
        Listagem de
        {' '}
        <strong>Categorias</strong>
      </h1>
      <div className="mb-3">
        <CategoriesForm onSubmitSuccess={fetch} />
      </div>
      <div className="mb-3">
        <Table
          loading={status === 'pending'}
          collection={collection}
          columns={columns}
        />
      </div>
    </div>
  );
}
