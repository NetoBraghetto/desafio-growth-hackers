import 'dotenv/config';
import './services/db';
import app from './app';

const port = 3000;

app.listen(port);
