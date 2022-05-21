export type DatabaseCofig = {
  default: string;
  connections: Record<
    string,
    {
      database: string;
      host: string;
      port: number;
      username: string;
      password: string;
    }
  >;
  migrations: string;
};

const database: DatabaseCofig = {
  default: process.env.DB_CONNECTION || 'mongo',
  connections: {
    mongo: {
      host: process.env.DB_HOST || '',
      port: parseInt(process.env.DB_PORT || '0', 10),
      database: process.env.DB_DATABASE || '',
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
    },
  },
  migrations: 'migrations',
};

export default database;
