import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

function getMongoD(): Promise<MongoMemoryServer> {
  return MongoMemoryServer.create();
}

export async function connect() {
  if (!mongod) {
    mongod = await getMongoD();
  }
  const uri = await mongod.getUri();

  await mongoose.connect(uri);
}

export async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

export async function clearDatabase() {
  const { collections } = mongoose.connection;

  const results = [];
  for (const k in collections) {
    if (Object.prototype.hasOwnProperty.call(collections, k)) {
      results.push(collections[k].drop);
    }
  }
  await Promise.all(results);
}

// const connInfo = config.database.connections[config.database.default];

// const conn = mongoose
//   .connect(`mongodb://${connInfo.host}:${connInfo.port}/${connInfo.database}`, {
//     authSource: 'admin',
//     user: connInfo.username,
//     pass: connInfo.password,
//   })
//   .catch((error) => {
//     console.error('==============================');
//     console.error(error);
//     console.error('==============================');
//   });

// export default conn;
