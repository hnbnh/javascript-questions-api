import { registerAs } from "@nestjs/config";
import * as Joi from "joi";

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),
  PORT: Joi.number().default(3000),
  POSTGRES_URL: Joi.string().required(),
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
        url: process.env.POSTGRES_URL,
      },
    },
  };
});
