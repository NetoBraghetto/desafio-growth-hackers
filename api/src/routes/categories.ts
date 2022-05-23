import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const categoriesRouter = Router();

categoriesRouter.get('/', CategoryController.index);
categoriesRouter.get('/:id', CategoryController.view);
categoriesRouter.post('/', CategoryController.store);
categoriesRouter.put('/:id', CategoryController.update);
categoriesRouter.delete('/:id', CategoryController.delete);

export default categoriesRouter;
