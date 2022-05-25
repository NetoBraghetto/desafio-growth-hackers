import { Router } from 'express';
import categoriesRouter from './categories';
import productsRouter from './products';

const api = Router();

api.use('/categories', categoriesRouter);
// TODO Rethink this
api.use('/categories', productsRouter);

export default api;
