import express, { Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import api from './routes/api';
import { ExceptionHandler } from './exceptions/Handler';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(api);
app.use(ExceptionHandler);

export default app;
