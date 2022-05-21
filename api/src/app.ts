import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import api from './routes/api';
import './services/mongoose';

const app: Application = express();

app.use(cors());
app.use(api);
app.use(express.json());

export default app;
