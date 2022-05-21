import mongoose from 'mongoose';
import { config } from '../config';

const connInfo = config.database.connections[config.database.default];

const conn = mongoose
  .connect(`mongodb://${connInfo.host}:${connInfo.port}/${connInfo.database}`, {
    authSource: connInfo.database,
    user: connInfo.username,
    pass: connInfo.password,
  })
  .catch((error) => {
    console.error('==============================');
    console.error(error);
    console.error('==============================');
  });

export default conn;
