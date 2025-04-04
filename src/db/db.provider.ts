import { DataSource } from 'typeorm';
import 'dotenv/config';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: DB_HOST ?? '127.0.0.1',
        port: Number(DB_PORT) ?? '',
        username: DB_USER ?? '',
        password: DB_PASS ?? '',
        database: DB_NAME ?? '',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
