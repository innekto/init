import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_USERNAME,
  POSTGRES_DB,
  SSL_CONNECTION,
} = process.env;

export const dataSourceOptionst: DataSourceOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['dist/**/*entity.js'],
  synchronize: true,
  ssl: Boolean(SSL_CONNECTION),
};

export const dataSourse = new DataSource(dataSourceOptionst);
