import { CategoriesForm } from 'components/categories/Form';

export function CategoriesList() {
  return (
    <div>
      <h1 className="display-6 fw-light mb-3">
        Listagem de
        {' '}
        <strong>Categorias</strong>
      </h1>
      <div className="mb-3">
        <CategoriesForm />
      </div>
    </div>
  );
}
