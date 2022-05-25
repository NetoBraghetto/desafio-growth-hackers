import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();

productsRouter.get('/:category_id/products/', ProductController.index);
productsRouter.get('/:category_id/products/:id', ProductController.view);
productsRouter.post('/:category_id/products/', ProductController.store);
productsRouter.put('/:category_id/products/:id', ProductController.update);
productsRouter.delete('/:category_id/products/:id', ProductController.delete);

export default productsRouter;
