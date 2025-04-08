import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['/../**/*.entity{.ts,.js}'],
  migrations: ['./src/db/migrations/*.ts'],
  migrationsTableName: 'users_migrations',
  synchronize: false,
});
