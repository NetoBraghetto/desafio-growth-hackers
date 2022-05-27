import { ProductsList } from 'components/products/List';
import { useEffect, useState } from 'react';
import { Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import categoryService, { Category } from 'services/categoryService';

export function CategoriesView() {
  const params = useParams<{id: string}>();
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    if (!params.id) return;

    categoryService.find(params.id)
      .then((res) => {
        setCategory(res.data);
      });
  }, [params.id]);

  if (!category?._id) {
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
      <h1 className="display-6 fw-light mb-3">
        { category.name }
      </h1>
      <ProductsList categoryId={category._id} />
    </div>
  );
}
