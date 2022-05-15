import { registerAs } from "@nestjs/config";
import * as Joi from "joi";

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),
  PORT: Joi.number().default(3000),
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PORT: Joi.number(),
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_DB: Joi.string(),
  SSL_CONNECTION: Joi.boolean(),
});

export const apiConfig = registerAs("api-config", () => {
  return {
    environment: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
    isTest: process.env.NODE_ENV === "test",

    port: Number(process.env.PORT),
    database: {
      postgres: {
        host: process.env.POSTGRES_HOST,
        db: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
      },
    },
  };
});
