import { defineConfig } from 'drizzle-kit';

const { DB_HOST = '127.0.0.1', DB_PORT, DB_USER, DB_PASSWORD } = process.env;

export default defineConfig({
  schema: './src/database/*',
  dialect: 'postgresql',
  dbCredentials: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'data_louna',
    ssl: false,
  },
});
