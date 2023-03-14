import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.PROD_DB_HOSTNAME,
  name: process.env.PROD_DB_NAME,
  password: process.env.PROD_DB_PASSWORD,
  username: process.env.PROD_DB_USERNAME,
}));
