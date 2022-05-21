import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const categoriesRouter = Router();

categoriesRouter.get('/', (req, res) => {
  res.status(200).json(CategoryController.index);
});
categoriesRouter.get('/:id', (req, res) => {
  res.status(200).json({});
});
categoriesRouter.post('/', (req, res) => {
  res.status(201).json({});
});
categoriesRouter.put('/:id', (req, res) => {
  res.status(200).json({});
});
categoriesRouter.delete('/:id', (req, res) => {
  res.status(200).json({});
});

export default categoriesRouter;
