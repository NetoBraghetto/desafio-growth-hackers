import { Router } from 'express';
import categoriesRouter from './categories';

const api = Router();

api.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

api.use('/categories', categoriesRouter);

export default api;
