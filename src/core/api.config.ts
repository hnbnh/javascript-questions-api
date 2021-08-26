import { registerAs } from '@nestjs/config';
import { boolean, number, object, string } from 'joi';

export const validationSchema = object({
  NODE_ENV: string().valid('development', 'production', 'test').required(),
  PORT: number().default(3000),
  POSTGRES_URL: string().required(),
  SSL_CONNECTION: boolean(),
});

export const apiConfig = registerAs('api-config', () => {
  return {
    environment: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',

    port: Number(process.env.PORT),
    database: {
      postgres: {
        url: process.env.POSTGRES_URL,
      },
    },
  };
});
